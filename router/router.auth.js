import express from "express";
import ControllerUser from "../controller/contoler.user.js";
import cors from "cors"
import upload from "../middleware/upload.js";


const routerAuth = express.Router();
routerAuth.use(cors({
    origin: '*',
  }));

routerAuth.post("/login",upload.none(),async(req,res)=>{
    ControllerUser.login(req,res);
})

export default routerAuth;