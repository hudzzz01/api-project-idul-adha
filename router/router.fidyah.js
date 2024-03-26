import express from "express";
import cors from "cors"
import auth from "../middleware/auth/auth.js";
import ControllerFidyah from "../controller/controller.fidyah.js";
import upload from "../middleware/upload.js";

const routerFidyah = express.Router();
routerFidyah.use(cors({
    origin: '*',
  }));
//ambil seluruh data keluarga (wajib Login)
routerFidyah.get("/",auth,async(req,res)=>{
    ControllerFidyah.readAllFidyah(req,res);
})

//ambil seluruh data keluarga by ID (wajib Login)
routerFidyah.get("/id/:id",auth,async(req,res)=>{
ControllerFidyah.readFidyahById(req,res);
})

routerFidyah.get("/pagination",auth,async(req,res)=>{
    console.log("a")
    ControllerFidyah.readFidyahByIdWithPagination(req,res);
})

routerFidyah.post("/",upload.none(),auth,async(req,res)=>{
    ControllerFidyah.createFidyah(req,res);
})

//edit data keluarga by id (wajib Login)
routerFidyah.put("/id/:id",upload.none(),auth,async(req,res)=>{
    ControllerFidyah.updateFidyah(req,res);
})

//hapus data keluarga (requre Login)
routerFidyah.delete("/id/:id",auth,async(req,res)=>{
    ControllerFidyah.deleteFidyah(req,res);
})

export default routerFidyah;