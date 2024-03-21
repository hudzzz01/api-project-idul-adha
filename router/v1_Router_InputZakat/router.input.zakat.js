import express from "express";
import cors from "cors"
import ControllerInputZakatV1 from "../../controller/v1_controller_inputZakat/input.jamaah.zakat.js";

const routerInputZakat = express.Router();
routerInputZakat.use(cors({
    origin: '*',
  }));


// routerInputZakat.post("/",async(req,res)=>{
//   var data = req.body.a;
//   data.forEach(element => {
//     console.log(element);
    
//   });
//   return res.send(200)
// })

routerInputZakat.post("/",async(req,res)=>{
  ControllerInputZakatV1.inputZakatJamaah(req,res);
})

routerInputZakat.get("/",async(req,res)=>{
  ControllerInputZakatV1.seluruhPembayaranZakat(req,res);
})

routerInputZakat.delete("/:uuid",async(req,res)=>{
  ControllerInputZakatV1.deletePembayaranZakat(req,res);
})
export default routerInputZakat;