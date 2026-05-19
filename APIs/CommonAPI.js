import exp from 'express'
import { authenticate } from '../Services/authService.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
import { UserTypeModel } from '../Models/UserModel.js'
import bcrypt from 'bcryptjs'
import { ArticleModel } from '../Models/ArticleModel.js'

export const commonRouter = exp.Router()

//login
commonRouter.post("/authenticate", async (req, res, next) => {
        let userCred = req.body
        //call authenticate
        const { token, user } = await authenticate(userCred)
        //set token cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })
        //send response
        res.status(200).json({message: "login success",payload: user})})


//logout
commonRouter.post("/logout", (req, res) => {
    //clear cookie named 'token'
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })
    res.status(200).json({message: "logout successful"})
})

//password
commonRouter.put('/change-password', verifyToken, async (req, res, next) => {
        //get current and new password from body
        let { currentPassword, newPassword } = req.body
        //check if both are provided
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Both currentPassword and newPassword are required"
            })
        }
        //find logged-in user
        const user = await UserTypeModel.findById(req.user.userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        //compare current password
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Current password is incorrect"
            })
        }
        //hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        //update password
        user.password = hashedPassword
        await user.save()
        res.status(200).json({
            message: "Password updated successfully"
        })
})

//add comment
commonRouter.post('/article/:articleId/comment', verifyToken, async (req, res, next) => {
    try {
        const articleId = req.params.articleId;
        const { comment } = req.body;
        const userId = req.user.userId;

        const article = await ArticleModel.findById(articleId);
        if(!article) {
            return res.status(404).json({message: "Article not found"});
        }
        article.comments.push({ user: userId, comment });
        const savedArticle = await article.save();
        // Return populated article
        const populated = await ArticleModel.findById(articleId).populate('author').populate('comments.user');
        res.status(200).json({message: "comment added", payload: populated});
    } catch(err) {
        next(err);
    }
})
