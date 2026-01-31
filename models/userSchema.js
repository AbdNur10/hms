import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name must be at least 3 characters long"],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name must be at least 3 characters long"],
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please enter a valid email"],
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message must be at least 10 characters long"],
    },
    phone:{
        type:String,
        required:true,
        minLength:[11,"Phone number must be at least 11 characters long"],
        
    },
    nic:{
        type:String,
        required:true,
        minLength:[13,"NIC number must be at least 13 characters long"],
        unique:true,
    },
    dob:{
        type:Date,
        required:[true,"Date of birth is required"],
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female","other"],
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password must be at least 8 characters long"],
        select:false,
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"],
        
    },
    doctorDepartment:{
        type:String,
    },
    docAvater:{
        public_id:String,
        url:String,
    }
});

 userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
 });

 userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
 };

//confused about that JWT is imported or not

 userSchema.methods.generateJsonWebToken=function(){
    return isJWT.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })
 }

export const User=mongoose.model("User",userSchema);