import express from "express";
import ControllerUser from "../controller/contoller.user.js";
import cors from "cors"
import upload from "../middleware/upload.js";
import auth from "../middleware/auth/auth.js";

const routerUser = express.Router();
routerUser.use(cors({
    origin: '*',
  }));
//ambil seluruh data user (wajib Login)
routerUser.get("/",auth,async(req,res)=>{
    ControllerUser.readAllUser(req,res);
})

//ambil seluruh data user by ID (wajib Login)
routerUser.get("/:id",auth,async(req,res)=>{
    ControllerUser.readUserById(req,res);
})

routerUser.post("/",upload.single('img'),async(req,res)=>{
    ControllerUser.createUser(req,res);
})

//edit data user by id (wajib Login)
routerUser.put("/:id",auth,upload.single('img'),async(req,res)=>{
    ControllerUser.updateUser(req,res);
})

//hapus data user (requre Login)
routerUser.delete("/:id",upload.none(),auth,async(req,res)=>{
    ControllerUser.deleteUser(req,res);
})

export default routerUser;