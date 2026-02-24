import express from 'express';
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from '../controller/userController.js';
import {isAdminAutheticated,isPatientAutheticated} from '../middlewares/auth.js';

const router = express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminAutheticated,addNewAdmin);
router.get("/doctors",getAllDoctors);
router.get("/admin/me",isAdminAutheticated,getUserDetails);
router.get("/patient/me",isPatientAutheticated,getUserDetails);
router.get("/admin/logout",isAdminAutheticated,logoutAdmin);
router.get("/patient/logout",isPatientAutheticated,logoutPatient);
router.post("/doctor/addnew",isAdminAutheticated,addNewDoctor);

export default router;