import {Schema, model} from 'mongoose'

const userSchema = new Schema({

    firstName : {
        type : String,
        required : [true, "first name is required"]
    }, 
    lastName : {
        type : String
    },
    email : {
        type : String,
        required : [true, "email is required"],
        unique : [true, "Email already existed"]
    },
    password : {
        type : String,
        required : [true, "password is required"]
    },
    profileImageUrl : {
        type : String
    },
    role : {
        type : String,
        enum : ["AUTHOR", "USER", "ADMIN"],
        required : [true, "{Value} is an Invalid role"]
    },
    isActive : {
        type : Boolean,
        default : true
    },
    isBlocked: {
    type: Boolean,
    default: false
}

},
{
    timestamps : true,
    strict : "throw",
    versionKey : false
})


//create model
export const UserTypeModel = model("users", userSchema)
