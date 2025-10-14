import dotenv from 'dotenv'
import { validationResult } from "express-validator"
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

export const register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()})
    const {name, email, password}=req.body
    try{
        let user=await User.findOne({email})
        if(user)
            return res.status(400).json({message:'User already exists'})

        const hashed=await bcrypt.hash(password,10)
        user=new User({name, email, password:hashed})
        await user.save()
        const token=jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
        res.status(201).json({token})
    }
    catch(err){
        console.error(err)
        res.status(500).send('Server error')
    }
}

export const login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()})
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(!user)
            return res.status(400).json({message:'Invalid credentials'})
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.status(400).json({message:'Invalid credentials'})
        const token=jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
        res.json({token})
    }
    catch(err){
        console.error(err)
        res.status(500).send('Server error')
    }
}