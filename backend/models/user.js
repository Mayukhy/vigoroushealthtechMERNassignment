import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail.js';

const userSchema = mongoose.Schema({

   userName:{
    type:String,
    required:true,
    unique:true
   },
 email:{
    type:String,
    required:true,
    unique:true,
    validate(value){
    if (!isEmail(value)) {
       throw new Error('Email is not valid') 
    }
    }
   },
 password:{
    type:String,
    required:true,
   },
 createdAt:{
    type:Date,
    default:new Date()
 },
})

const userData = mongoose.model('User',userSchema)
export default userData;