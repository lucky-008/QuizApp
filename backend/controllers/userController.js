import mongoose from 'mongoose';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const TOKEN_EXPIRES_IN='24h';
const JWT_SECRET='e58587706d560dbaf0a89a7168bb2483a008cc98e4e386b91d766164d221817327a178ad2d723934bbf5aadf5f065318268142cccd327aae82246d3a6ae7f352';
export async function register(req,res){
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"});

    
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({
            success:false,
            message:"Invalid email format"
        });
    }
    const exist=await User.findOne({email}).lean();
    if(exist){
        return res.status(409).json({
            success:false,
            message:"Email already registered"
        });
    }
    const newId=new mongoose.Types.ObjectId();
    const hashedPassword=await bcrypt.hash(password,10);
    const user=new User({
        _id:newId,
        name,
        email,
        password:hashedPassword
    });
    await user.save();
    if(!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    const token=jwt.sign({id:newId.toString()},JWT_SECRET,{expiresIn:TOKEN_EXPIRES_IN});
    return res.status(201).json({
        success:true,
        message:"User registered successfully",
        token,
        user:{id:user._id.toString(),name:user.name,email:user.email}
    });
    }
catch(error){
    console.error("Error in register:",error);
    return res.status(500).json({
        success:false,
        message:"Server error"
    });


}
}
export async function login(req,res){
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
                const user=await User.findOne({email});
                if(!user){
                    return res.status(401).json({
                        success:false,
                        message:"Invalid email or password"
                    });
                }
                const isMatch=await bcrypt.compare(password,user.password);
                if(!isMatch){
                    return res.status(401).json({
                        success:false,
                        message:"Invalid email or password"
                    });
                }
                const token=jwt.sign({id:user._id.toString()},JWT_SECRET,{expiresIn:TOKEN_EXPIRES_IN});
                return res.status(200).json({
                    success:true,
                    message:"Login successful",
                    token,
                    user:{id:user._id.toString(),name:user.name,email:user.email}
                });
            }
            catch(error){
                console.error("Error in login:",error);
                return res.status(500).json({
                    success:false,
                    message:"Server error"
                });
            }
        }
