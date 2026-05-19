import exp from 'express'
import { ArticleModel } from '../Models/ArticleModel.js'
import { UserTypeModel } from '../Models/UserModel.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
export const adminRoute= exp.Router()



//read all articles(optional)

//Block user 
adminRoute.put('/block-user/:userId', verifyToken, async (req, res, next) => {
        let userId = req.params.userId
        const blockedUser = await UserTypeModel.findByIdAndUpdate(userId, { isBlocked: true }, { new: true })
        if (!blockedUser) {
            return res.status(404).json({message: "User not found"})}
        res.status(200).json({message: "user blocked successfully", payload: blockedUser})
    })



//Unblock user
adminRoute.put('/unblock-user/:userId', verifyToken, async (req, res, next) => {
        let userId = req.params.userId
        const unblockedUser = await UserTypeModel.findByIdAndUpdate(userId, { isBlocked: false }, { new: true })
        if (!unblockedUser) {
            return res.status(404).json({message: "User not found"})}
        res.status(200).json({message: "user unblocked successfully", payload: unblockedUser})
})






