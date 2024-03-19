import Token from "../middleware/auth/jwt.js";
import ServiceMasjid from "../service/service.masjid.js";
import ViewResponse from "../view/view.response.js";
import CryptoJS from "crypto-js";


let gagal = 200;


class ControllerMasjid{

    static async createMasjid(req,res){
        try {
            const masjid = req.body;
            masjid.foto = req.file.filename;
            const createMasjid = await ServiceMasjid.createMasjid(masjid);
            ViewResponse.success(res,"berhasil menambahkan masjid baru",createMasjid,200)
        } catch (error) {
            ViewResponse.fail(res,"gagal menambahkan data masjid baru",error,gagal);
        }
        
    }
    static async readAllMasjid(req,res){
        try {
            const seluruhMasjid = await ServiceMasjid.readAllMasjid();
            ViewResponse.success(res,"berhasil mengambil data masjid",seluruhMasjid,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data masjid",error,gagal);
        }
     }

    static async readMasjidById(req,res){
        try {
            const masjid = await ServiceMasjid.readById(req.params.id);
            ViewResponse.success(res,"berhasil mengambil data masjid",masjid,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data masjid",error,gagal);
        }
    }

    static async updateMasjid(req,res){
        try {
            const masjid = req.body;
            masjid.foto = req.file.filename;
            const newMasjid = await ServiceMasjid.updateMasjid(req.params.id,masjid);
            ViewResponse.success(res,"berhasil mengubah data masjid",newMasjid,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengubah data masjid",error,gagal);
        }
    }
    static async deleteMasjid(req,res){
        try {
            const deleteMasjid = await ServiceMasjid.deleteMasjid(req.params.id);
            ViewResponse.success(res,"berhasil menghapus data masjid",deleteMasjid,200);
        } catch (error) {
            ViewResponse.fail(res,"gagal memnghapus data masjid", error,gagal);
        }
    }
}

export default ControllerMasjid;