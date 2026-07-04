import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import  User from "../models/db.user.js"
import dotenv from 'dotenv'
dotenv.config()

export const register=async(username,password,email)=>{
    try{
        const existing=await User.findOne({email})
    if(existing){
        return res.status(400).json({message:" email already exists"})
    }

    const hash=await bcrypt.hash(password,12)
    await User.create({username,hash,email})
    res.json({message:"created successfully"})
    }
    catch(error){
        res.json({message:"Server Error"})
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const tempUser=await User.findOne({email})
        if(!tempUser){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const valid=bcrypt.compare(password, tempUser.password)
        if(!valid){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token=jwt.sign(
            user._id,process.env.KEY,
            {expiresIn:"1h"}
        )

    }
   catch(error){
    res.json({message:"server error"})
    }
}
