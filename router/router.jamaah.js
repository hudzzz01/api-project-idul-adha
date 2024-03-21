import express from "express";
import cors from "cors"
import auth from "../middleware/auth/auth.js";
import ControllerJamaah from "../controller/controller.jamaah.js";
import uploadFotoJamaah from "../middleware/upload.foto.jamah.js";

const routerJamaah = express.Router();
routerJamaah.use(cors({
    origin: '*',
  }));
//ambil seluruh data Jamaah (wajib Login)
routerJamaah.get("/",auth,async(req,res)=>{
    ControllerJamaah.readAllJamaah(req,res);
})

//ambil seluruh data Jamaah by ID (wajib Login)
routerJamaah.get("/:id",auth,async(req,res)=>{
    ControllerJamaah.readJamaahById(req,res);
})

routerJamaah.post("/",uploadFotoJamaah.single('foto'),auth,async(req,res)=>{
    ControllerJamaah.createJamaah(req,res);
})

//edit data Jamaah by id (wajib Login)
routerJamaah.put("/:id",auth,uploadFotoJamaah.single('foto'),async(req,res)=>{
    ControllerJamaah.updateJamaah(req,res);
})

//hapus data Jamaah (requre Login)
routerJamaah.delete("/:id",uploadFotoJamaah.none(),auth,async(req,res)=>{
    ControllerJamaah.deleteJamaah(req,res);
})

export default routerJamaah;