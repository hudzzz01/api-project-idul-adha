import express from "express";
import cors from "cors"
import auth from "../middleware/auth/auth.js";
import ControllerMasjid from "../controller/controller.masjid.js";
import uploadFotoMasjid from "../middleware/upload.foto.masjid.js";

const routerMasjid = express.Router();
routerMasjid.use(cors({
    origin: '*',
  }));
//ambil seluruh data Jamaah (wajib Login)
routerMasjid.get("/",auth,async(req,res)=>{
    ControllerMasjid.readAllMasjid(req,res);
})

//ambil seluruh data Jamaah by ID (wajib Login)
routerMasjid.get("/:id",auth,async(req,res)=>{
    ControllerMasjid.readMasjidById(req,res);
})

routerMasjid.post("/",uploadFotoMasjid.single('foto'),async(req,res)=>{
    ControllerMasjid.createMasjid(req,res);
})

//edit data Jamaah by id (wajib Login)
routerMasjid.put("/:id",auth,uploadFotoMasjid.single('foto'),async(req,res)=>{
    ControllerMasjid.updateMasjid(req,res);
})

//hapus data Jamaah (requre Login)
routerMasjid.delete("/:id",uploadFotoMasjid.none(),auth,async(req,res)=>{
    ControllerMasjid.deleteMasjid(req,res);
})

export default routerMasjid;