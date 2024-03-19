import express from "express";
import cors from "cors"
import auth from "../middleware/auth/auth.js";
import upload from "../middleware/upload.js";
import ControllerTokenKupon from "../controller/controller.token.kupon.js";
import uploadFotoYangAmbil from "../middleware/upload.foto.penerima.js";


const routerTokenKupon = express.Router();
routerTokenKupon.use(cors({
    origin: '*',
  }));
//ambil seluruh data tokenKupon (wajib Login)
routerTokenKupon.get("/",auth,async(req,res)=>{
    ControllerTokenKupon.readAllTokenKupon(req,res);
})

//ambil seluruh data Jamaah by ID (wajib Login)
routerTokenKupon.get("/:id",auth,async(req,res)=>{
    ControllerTokenKupon.readTokenKuponById(req,res);
})

routerTokenKupon.post("/",upload.none(),auth,async(req,res)=>{
    ControllerTokenKupon.createTokenKupon(req,res);
})

//edit data Jamaah by id (wajib Login)
routerTokenKupon.put("/:id",auth,uploadFotoYangAmbil.single('foto'),async(req,res)=>{
    ControllerTokenKupon.updateTokenKupon(req,res);
})

//hapus data Jamaah (requre Login)
routerTokenKupon.delete("/:id",auth,async(req,res)=>{
    ControllerTokenKupon.deleteToken(req,res);
})

export default routerTokenKupon;