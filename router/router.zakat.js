import express from "express";
import cors from "cors"
import auth from "../middleware/auth/auth.js";
import ControllerZakat from "../controller/controller.zakat.js";
import upload from "../middleware/upload.js";

const routerZakat = express.Router();
routerZakat.use(cors({
    origin: '*',
  }));
//ambil seluruh data keluarga (wajib Login)
routerZakat.get("/",auth,async(req,res)=>{
    ControllerZakat.readAllZakat(req,res);
})

//ambil seluruh data keluarga by ID (wajib Login)
routerZakat.get("/id/:id",auth,async(req,res)=>{
ControllerZakat.readZakatById(req,res);
})

routerZakat.get("/pagination",auth,async(req,res)=>{
    console.log("a")
    ControllerZakat.readZakatByIdWithPagination(req,res);
})

routerZakat.post("/",upload.none(),auth,async(req,res)=>{
    ControllerZakat.createZakat(req,res);
})

//edit data keluarga by id (wajib Login)
routerZakat.put("/id/:id",upload.none(),auth,async(req,res)=>{
    ControllerZakat.updateZakat(req,res);
})

//hapus data keluarga (requre Login)
routerZakat.delete("/id/:id",auth,async(req,res)=>{
    ControllerZakat.deleteZakat(req,res);
})

export default routerZakat;