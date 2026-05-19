import mongoose from 'mongoose'
import { UserTypeModel } from '../Models/UserModel.js'

export const checkAuthor = async (req, res, next) => {
    try {
        //get author id from params
        let authorId = req.params.authorId

        //validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res.status(400).json({message: "Invalid author id"})
        }
        //verify author existence and role
        const author = await UserTypeModel.findOne({_id: authorId, role: "AUTHOR"
        })
        //if author not found
        if (!author) {
            return res.status(404).json({message: "Author not found"})
        }
        //if author is found but role is diff
        //if author blocked
        //attach author to request object
        req.author = author
        //move to next middleware
        next()
    } catch (err) {
        next(err)
    }
}
