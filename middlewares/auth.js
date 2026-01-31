import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddleware.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';

export const isAdminAutheticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin is not Authenticated",401));
    }

    const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decode.id);
    if(req.user.role!=="Admin"){
        return next(new ErrorHandler("Only Admin can access this route",401));
    }
    next();
    
});

export const isPatientAutheticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Patient is not Authenticated",401));
    }

    const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decode.id);
    if(req.user.role!=="Patient"){
        return next(new ErrorHandler("Only Admin can access this route",401));
    }
    next();
    
});