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

routerInputZakat.post("/input-fidyah/",async(req,res)=>{
  ControllerInputZakatV1.inputKususFidyah(req,res);
})
routerInputZakat.get("/search/fidyahAll/",async(req,res)=>{
  ControllerInputZakatV1.seluruhPembayaranFidyah(req,res)
})

routerInputZakat.delete("/search/fidyahDelete/:uuid",async(req,res)=>{
  ControllerInputZakatV1.deletePembayaranFidyah(req,res);
})
//fidyah di atas 


routerInputZakat.post("/input/",async(req,res)=>{
  ControllerInputZakatV1.inputZakatJamaah(req,res);
})

routerInputZakat.get("/search/all/",async(req,res)=>{
  ControllerInputZakatV1.seluruhPembayaranZakat(req,res);
})
routerInputZakat.get("/search/zakat/id/:uuid",async(req,res)=>{
  ControllerInputZakatV1.getPembayaranZakatById(req,res);
})
routerInputZakat.put("/search/zakat/update/:uuid",async(req,res)=>{
  ControllerInputZakatV1.updatePembayaranZakat(req,res);
})

routerInputZakat.get("/search/pagination/",async(req,res)=>{
  ControllerInputZakatV1.seluruhPembayaranZakatWithPagination(req,res);
})

routerInputZakat.get("/search/kesimpulan/",async(req,res)=>{
  ControllerInputZakatV1.kesimpulan(req,res);
})

routerInputZakat.delete("/delete/:uuid",async(req,res)=>{
  ControllerInputZakatV1.deletePembayaranZakat(req,res);
})
export default routerInputZakat;