// import jwt from 'jsonwebtoken'
// import {config} from 'dotenv'
// config()


// export const verifyToken = async(req, res, next) => {
//     //read token from req
//     let token = req.cookies;
//     if(token === undefined){
//         return res.status(400).json({message : "Unauthorized request, please login"})
//     }
//     //verify the validity of the token (decoding the token)
//     let decodedToken = jwt.verify(token, process.env.JWT_SECRET)

//     //forward request to next middleware or route
//     next()

// }

import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    try {
        //get token from cookies
        let token = req.cookies.token
        //if token not present
        if (!token) {
            return res.status(401).json({
                message: "Token missing"
            })
        }
        //verify token
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        //attach decoded user to req
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}
