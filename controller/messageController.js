import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";
import {} from "../middlewares/errorMiddleware.js"
import { get } from "mongoose";
export const sendMessage =catchAsyncErrors (async (req, res, next) => {
  const { firstName, lastName, email, message, phone } = req.body;
  if (!firstName || !lastName || !email || !message || !phone) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  await Message.create({
    firstName,
    lastName,
    email,
    message,
    phone,
  });
  return res.status(200).json({sucess:true, message: "Message sent successfully" });
});


export const getAllMessages=catchAsyncErrors(async(req,res,next)=>{
    const messages=await Message.find();
    res.status(200).json({success:true,messages});
});