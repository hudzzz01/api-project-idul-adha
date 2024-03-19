import express from "express";
import cors from "cors"
import auth from "../middleware/auth/auth.js";
import ControllerPenerima from "../controller/controler.penerima.js";
import upload from "../middleware/upload.js";


const routerPenerima = express.Router();
routerPenerima.use(cors({
    origin: '*',
  }));
//ambil seluruh data Jamaah (wajib Login)
routerPenerima.get("/",auth,async(req,res)=>{
    ControllerPenerima.readAllPenerima(req,res);
})

//ambil seluruh data Jamaah by ID (wajib Login)
routerPenerima.get("/:id",auth,async(req,res)=>{
    ControllerPenerima.readPenerimaById(req,res);
})

routerPenerima.post("/",upload.none(),auth,async(req,res)=>{
    ControllerPenerima.createPenerima(req,res);
})

//edit data Jamaah by id (wajib Login)
routerPenerima.put("/:id",auth,upload.none(),async(req,res)=>{
    ControllerPenerima.updatePenerima(req,res);
})

//hapus data Jamaah (requre Login)
routerPenerima.delete("/:id",auth,async(req,res)=>{
    ControllerPenerima.deletePenerima(req,res);
})

export default routerPenerima;