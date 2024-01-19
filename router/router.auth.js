import express from "express";
import ControllerAuth from "../controller/controller.auth.js";
import cors from "cors"
import upload from "../middleware/upload.js";


const routerAuth = express.Router();
routerAuth.use(cors({
    origin: '*',
  }));

routerAuth.post("/login",upload.none(),async(req,res)=>{
    ControllerAuth.login(req,res);
})

routerAuth.post("/reset-password",upload.none(),async(req,res)=>{
    ControllerAuth.resetPassword(req,res);
})

routerAuth.post("/validasi-otp",upload.none(),async(req,res)=>{
  ControllerAuth.validasiOTP(req,res);
})

export default routerAuth;