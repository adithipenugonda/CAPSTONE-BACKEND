import exp from 'express'
import { register, authenticate } from '../Services/authService.js'
import { ArticleModel } from '../Models/ArticleModel.js'
import { UserTypeModel } from '../Models/UserModel.js'
import { checkAuthor } from '../Middlewares/checkAuthor.js'
import { verifyToken } from '../Middlewares/verifyToken.js'



export const authorRoute = exp.Router()


//Register author (public)
authorRoute.post('/users', async (req, res, next) => {
    try {
        //get user obj from req
        let userObj = req.body;
        //call register
        const newUserObj = await register({ ...userObj, role: "AUTHOR" })
        //send res
        res.status(201).json({message: "author created", payload: newUserObj})
    } catch (err) {
        next(err)
    }
})






//Authenticate author (public)
// authorRoute.post('/authenticate', async (req, res, next) => {
//     try {
//         //get credentials from req
//         let userCred = req.body
//         //call authenticate and force AUTHOR role
//         const { token, user } = await authenticate({
//             ...userCred,
//             role: "AUTHOR"
//         })
//         //set token cookie
//         res.cookie("token", token, {
//             httpOnly: true,
//             sameSite: "lax",
//             secure: false
//         })

//         //send res
//         res.status(200).json({message: "login success",payload: user})
//     } catch (err) {
//         next(err)
//     }
// })




//create article (protected)
authorRoute.post('/articles', verifyToken, async (req, res, next) => {
    try {
        let articleObj = req.body
        const newArticle = new ArticleModel({
            ...articleObj,
            author: req.user.userId,
            isArticleActive: true
        })
        const savedArticle = await newArticle.save()
        res.status(201).json({message: "article created",payload: savedArticle})
    } catch (err) {
        next(err)
    }
})



//read articles of author (protected)
authorRoute.get('/articles/:authorId', verifyToken, async (req, res, next) => {
    try {
        //get author id from params
        let authorId = req.params.authorId
        //read all articles by this author which are active
        const articles = await ArticleModel.find({author: authorId, isArticleActive: true}).populate("author")
        //send res
        res.status(200).json({message: "articles fetched",payload: articles})
    } catch (err) {
        next(err)
    }
})



//edit article (protected)
authorRoute.put('/articles/:articleId', verifyToken, async (req, res, next) => {
    try {
        //get articleId from params
        let articleId = req.params.articleId
        //get modified article from req
        let modifiedArticle = req.body
        //find article first
        const article = await ArticleModel.findOne({_id: articleId})

        //check if article exists
        if (!article) {
            return res.status(404).json({message: "Article not found"})
        }
        //check if logged-in author owns this article
        if (article.author.toString() !== req.user.userId) {
            return res.status(403).json({message: "You are not allowed to edit this article"})
        }
        //update article
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            {
                title: modifiedArticle.title,
                category: modifiedArticle.category,
                content: modifiedArticle.content
            },
            { new: true }
        ).populate("author").populate("comments.user")
        //send response
        res.status(200).json({message: "article updated",payload: updatedArticle})
    } catch (err) {
        next(err)
    }
})


//delete (permanent delete) article (protected)
authorRoute.delete('/articles/:articleId', verifyToken, async (req, res, next) => {
    try {
        let articleId = req.params.articleId
        const article = await ArticleModel.findById(articleId)
        if (!article) {
            return res.status(404).json({message: "Article not found"})
        }
        // Check ownership
        if (article.author.toString() !== req.user.userId) {
            return res.status(403).json({message: "You are not allowed to delete this article"})
        }
        await ArticleModel.findByIdAndDelete(articleId)
        res.status(200).json({message: "article permanently deleted"})
    } catch (err) {
        next(err)
    }
})

