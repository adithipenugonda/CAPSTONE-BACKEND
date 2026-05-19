import exp from 'express'
import cors from 'cors'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser' 
import { userRoute } from './APIs/UserAPI.js'
import { authorRoute } from './APIs/AuthorAPI.js'
import { adminRoute } from './APIs/AdminAPI.js'
import { commonRouter } from './APIs/CommonAPI.js'

config() //process.env

//create express application
const app = exp()
//add bodyparser middleware
app.use(exp.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
//add cookieparser middleware
app.use(cookieParser())

//connect APIs
app.use('/user-api', userRoute)
app.use('/author-api', authorRoute)
app.use('/admin-api', adminRoute)
app.use('/common-api', commonRouter)
app.use('/admin-api', adminRoute)








//connect to DB
const connectDB = async() => {
    try{
    await connect(process.env.DB_URL)
    console.log("DB connection successful")
    //start http server
    app.listen(process.env.port, () => {
        console.log("server started")
    })
    }catch(err){
        console.log("DB connection failed", err)
    }
}
connectDB()

//logout for user, author, admin

// app.post('/logout', (req, res) => {
//     //clear the cookie names 'token'
//     res.clearCookie('token', {
//         httpOnly : true,  //must match original settings
//         secure : false,   //must match original settings
//         sameSite : 'lax'  //must match original settings
//     })
// })


//dealing with invalid path
app.use((req, res, next) => {
    res.json({message : `${req.url} is invalid path`});
})

//error handling middleware
app.use((err, req, res, next) => {
    console.log("err :", err)
    res.json({message: "error occured", reason: err.message})
})