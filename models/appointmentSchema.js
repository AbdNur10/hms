import mongoose from "mongoose";
import validator from "validator";


const appointmentSchema=new mongoose.Schema({
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
   appointment_date:{
    type:String,
    required:true
   },
   department:{
    type:String,
    required:true
   },
   doctor:{
    firstName:{
         type:String,
    required:true
    },
    lastName:{
         type:String,
    required:true
    }
   },
   hasVisited:{
    type:Boolean,
    default:false,
   },
    address: {
    type: String,
    required: [true, "Address Is Required!"],
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Doctor Id Is Invalid!"],
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Patient Id Is Required!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});


export const Appointment=mongoose.model("Appointment",appointmentSchema);