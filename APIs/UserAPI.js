import exp from 'express'
import {authenticate, register} from '../Services/authService.js'
import { ArticleModel } from '../Models/ArticleModel.js'
export const userRoute= exp.Router()

//Register user
userRoute.post('/users', async(req, res) => {
    //get user obj from req
    let userObj = req.body;
    //call register
   const newUserObj = await register({...userObj, role: "USER"})
   //send res
   res.status(201).json({message: "user created", payload : newUserObj})
})
//Authenticate user
// userRoute.post("/authenticate", async(req, res) => {
//     //get user cred
//     let userCred = req.body;

//     let {token, user} = await authenticate(userCred)
//     res.cookie("token", token, {httpOnly : true, sameSite : "lax", secure : false})
//     //send res
//     res.status(200).json({message:"login success", payload:user})
// })
//Read all articles
userRoute.get('/articles', async (req, res, next) => {
        //find all active articles
        const articles = await ArticleModel.find({
            isArticleActive: true
        }).populate('author').populate('comments.user')
        //send response
        res.status(200).json({message: "articles fetched",payload: articles})
})

//Read single article by ID
userRoute.get('/articles/:articleId', async (req, res, next) => {
    try {
        const article = await ArticleModel.findOne({
            _id: req.params.articleId,
            isArticleActive: true
        }).populate('author').populate('comments.user')
        if (!article) {
            return res.status(404).json({message: "Article not found"})
        }
        res.status(200).json({message: "article fetched", payload: article})
    } catch(err) {
        next(err)
    }
})
//Add comment to an article