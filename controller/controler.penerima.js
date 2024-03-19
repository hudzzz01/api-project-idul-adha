import Token from "../middleware/auth/jwt.js";
import ServicePenerima from "../service/service.penerima.js";
import ViewResponse from "../view/view.response.js";
import CryptoJS from "crypto-js";


let gagal = 200;


class ControllerPenerima{

    static async createPenerima(req,res){
        try {
            const penerima = req.body;
            const userLogin = req.user;
            const createPenerima = await ServicePenerima.createPenerima(penerima,userLogin);
            ViewResponse.success(res,"berhasil menambahkan penerima baru",createPenerima,200)
        } catch (error) {
            ViewResponse.fail(res,"gagal menambahkan data penerima baru",error,gagal);
        }
        
    }
    static async readAllPenerima(req,res){
        try {
            const seluruhPenerima = await ServicePenerima.readAllPenerima()
            ViewResponse.success(res,"berhasil mengambil data penerima",seluruhPenerima,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data penerima",error,gagal);
        }
     }

    static async readPenerimaById(req,res){
        try {
            const penerima = await ServicePenerima.readById(req.params.id);
            ViewResponse.success(res,"berhasil mengambil data penerima",penerima,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data penerima",error,gagal);
        }
    }

    static async updatePenerima(req,res){
        try {
            const penerima = req.body;
            const userLogin = req.user;
            const newPenerima = await ServicePenerima.updatePenerima(req.params.id,penerima,userLogin);
            ViewResponse.success(res,"berhasil mengubah data penerima",newPenerima,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengubah data penerima",error,gagal);
        }
    }
    static async deletePenerima(req,res){
        try {
            const deletePenerima = await ServicePenerima.deletePenerima(req.params.id);
            ViewResponse.success(res,"berhasil menghapus data Penerima",deletePenerima,200);
        } catch (error) {
            ViewResponse.fail(res,"gagal memnghapus data Penerima", error,gagal);
        }
    }
}

export default ControllerPenerima;