import express from "express";
import cors from "cors"
import auth from "../middleware/auth/auth.js";
import ControllerSodakoh from "../controller/controller.sodakoh.js";
import upload from "../middleware/upload.js";

const routerSodakoh = express.Router();
routerSodakoh.use(cors({
    origin: '*',
  }));
//ambil seluruh data keluarga (wajib Login)
routerSodakoh.get("/",auth,async(req,res)=>{
    ControllerSodakoh.readAllSodakoh(req,res);
})

//ambil seluruh data keluarga by ID (wajib Login)
routerSodakoh.get("/:id",auth,async(req,res)=>{
    ControllerSodakoh.readSodakohById(req,res);
})

routerSodakoh.post("/",upload.none(),auth,async(req,res)=>{
    ControllerSodakoh.createSodakoh(req,res);
})

//edit data keluarga by id (wajib Login)
routerSodakoh.put("/:id",upload.none(),auth,async(req,res)=>{
    ControllerSodakoh.updateSodakoh(req,res);
})

//hapus data keluarga (requre Login)
routerSodakoh.delete("/:id",auth,async(req,res)=>{
    ControllerSodakoh.deleteSodakoh(req,res);
})

export default routerSodakoh;