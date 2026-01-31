import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddleware.js';
import { User } from '../models/userSchema.js';
import { generateToken } from '../utils/jwtToken.js';


export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phone,
        nic,
        gender,
        dob,
        role,
    } = req.body;

    // Check required fields
    if (!firstName || !lastName || !email || !password || !phone || !nic || !gender || !dob || !role) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }

    // Create new user
    user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phone,
        nic,
        gender,
        dob,
        role,
    });
    generateToken(user, "User registered successfully", 201, res);
    
});


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and confirm password do not match", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }

    if (role !== user.role) {
        return next(new ErrorHandler("Invalid role", 400));
    }

    generateToken(user, "User logged in successfully", 200, res);
});



export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
        const {
        firstName,
        lastName,
        email,
        password,
        phone,
        nic,
        gender,
        dob,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !phone || !nic || !gender || !dob) {
        return next(new ErrorHandler("All fields are required", 400));
};

    const isRegistered=await User.findOne({email});


    if(isRegistered){
        return next(new ErrorHandler("User already exists", 400));
    }
    const admin=await User.create({
        firstName,
        lastName,
        email,
        password,
        phone,
        nic,
        gender,
        dob,
        role:"Admin"
    });
    res.status(200).json({success:true,message:"Admin registered successfully"});
});


export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctor=await User.find({role:"Doctor"});
    res.status(200).json({success:true,doctor});
});



export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=res.user;
    res.status(200).json({success:true,user});
});


export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully.",
    });
});



export const addNewDoctor=catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Avater is required", 400));
    }
    const {docAvater}=req.files;
    const allowedFormats=["image/jpeg","image/png","image/jpg","image/gif","image/webp"];

    //Condition is Required....
})