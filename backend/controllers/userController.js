import userData from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { createError } from '../error.js'
import nodemailer, { createTransport } from 'nodemailer'
import crypto from 'crypto'
import { sendEmail } from '../sendEmail.js'
export const signIn = async(req,res,next)=>{
const {userName,password} = req.body
try {
    const existinguser = await userData.findOne({userName})
    if (!existinguser) {
        return next(createError(404, "User not found!"));
    }
    const correctpassword = await bcrypt.compare(password,existinguser?.password)
    if (!correctpassword) {
        return next(createError(400, "Wrong Credentials!"));
    }
    else{
        const token = jwt.sign({id:existinguser?._id,userName:existinguser?.userName,email:existinguser?.email},'jwtkey',{expiresIn:'1d'}) 
        res.cookie('access_token',token)  
        .status(200)
        .json(existinguser)
        // res.json({existinguser,token})
    }
} catch (error) {
    res.status(404).json(error)
}

}

export const signUp = async(req,res,next)=>{
    const {userName,email,password} = req.body
    try {
        const existinguser = await userData.findOne({userName})
        if (existinguser) {
            res.status(400);
            throw new Error("User already exists");
        }  
        if (password?.length <= 7) {
            res.status(400).json({message:'Password should min length of 7'})
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const result = new userData({ userName,email,password:hashedpassword})
        await result.save()
        res.json(result)
    } catch (error) {
       next(error)
    }
    
}

//This API will handle generate a token then it will send an email to the user
export const generateResetlink=async(req,res,next)=>{

    const {email} = req.body;

    try {
    const user = await userData.find({ email:email });
  
    if (!user) {
     return res.status(404).json('User not found');
    }
    const token = crypto.randomBytes(20).toString('hex');
    const expirationTime = Date.now() + 3600000; // Token expires in 1 hour

    const resetLink = `Click here to reset password http://localhost:5173/resetpassword/${user?._id}/${token}`;
    await sendEmail(user?.email,"Reset password",resetLink)

      res.json('Password reset email sent.');
    } catch (error) {
      console.error(error);
      res.status(500).json('Internal Server Error');
    }
}



//to change the password
 export const changePassword=async(req,res,next)=>{
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwtkey", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            const hashedpassword = bcrypt.hash(password,10)
            try {
                userData.findByIdAndUpdate({_id: id}, {password: hashedpassword}) 
                res.status(201).json("Password changed Successfully")
                
            } catch (error) {
                next(error)
            }
        }
    })
 }