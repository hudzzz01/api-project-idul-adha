import express from "express";
import cors from "cors"
import auth from "../middleware/auth/auth.js";
import ControllerFamily from "../controller/controller.family.js";
import upload from "../middleware/upload.js";

const routerFamily = express.Router();
routerFamily.use(cors({
    origin: '*',
  }));
//ambil seluruh data keluarga (wajib Login)
routerFamily.get("/",auth,async(req,res)=>{
    ControllerFamily.readAllFamily(req,res);
})

//ambil seluruh data keluarga by ID (wajib Login)
routerFamily.get("/:id",auth,async(req,res)=>{
    ControllerFamily.readFamilyById(req,res);
})

routerFamily.post("/",upload.none(),auth,async(req,res)=>{
    console.log(req.body)
    ControllerFamily.createFamily(req,res);
})

//edit data keluarga by id (wajib Login)
routerFamily.put("/:id",upload.none(),auth,async(req,res)=>{
    ControllerFamily.updateFamily(req,res);
})

//hapus data keluarga (requre Login)
routerFamily.delete("/:id",auth,async(req,res)=>{
    ControllerFamily.deleteFamily(req,res);
})

export default routerFamily;