import Token from "../middleware/auth/jwt.js";
import ServiceJamaah from "../service/service.jamaah.js";
import ViewResponse from "../view/view.response.js";
import CryptoJS from "crypto-js";


let gagal = 200;
// const kunciEnkripsiPassword = "Mirajmetrics-R4h@5!a";

class ControllerJamaah{

    // Fungsi untuk login dengan data jamaah
    // static async login(req,res){
    //     try {
    //         const jamaah = await ServiceJamaah.readByEmail(req.body.email);
    //         const ciperPassword = CryptoJS.HmacSHA256(req.body.password,kunciEnkripsiPassword).toString();
    //         //console.log(ciper Password)
    //         //console.log(jamaah[0].password)
    //         if(jamaah[0].password != ciperPassword){
    //             throw Error("password salah");
    //         }

    //         const token = await Token.createToken({
    //             id : jamaah[0].id,
    //             nama: jamaah[0].nama,
    //             role : jamaah[0].role
    //         });
    //         const data = {
    //             jamaahId:jamaah[0].uuid,
    //             token:token,
    //         }
    //         ViewResponse.success(res,"berhasil login",data,200);
    //     } catch (error) {
    //         ViewResponse.fail(res,"gagal login",error,gagal);
    //     }
    // }
    static async createJamaah(req,res){
        try {
            const jamaah = req.body;
            jamaah.foto = "";//req.file.filename;
            const createJamaah = await ServiceJamaah.createJamaah(jamaah);
            ViewResponse.success(res,"berhasil membuat jamaah baru",createJamaah,200)
        } catch (error) {
            ViewResponse.fail(res,"gagal membuat jamaah baru",error,gagal);
        }
        
    }
    static async readAllJamaah(req,res){
        try {
            const jamaahs = await ServiceJamaah.readAllJamaah();
            ViewResponse.success(res,"berhasil mengambil data jamaah",jamaahs,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data jamaah",error,gagal);
        }
     }

    static async readJamaahById(req,res){
        try {
            const jamaah = await ServiceJamaah.readById(req.params.id);
            ViewResponse.success(res,"berhasil mengambil data jamaah",jamaah,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data jamaah",error,gagal);
        }
    }

    static async updateJamaah(req,res){
        try {
            const jamaah = req.body;
            jamaah.foto = "";//req.file.filename;
            const newJamaah = await ServiceJamaah.updateJamaah(req.params.id,jamaah);
            ViewResponse.success(res,"berhasil mengubah data jamaah",newJamaah,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengubah data jamaah",error,gagal);
        }
    }
    static async deleteJamaah(req,res){
        try {
            const deleteJamaah = await ServiceJamaah.deleteJamaah(req.params.id);
            ViewResponse.success(res,"berhasil menghapus data jamaah",deleteJamaah,200);
        } catch (error) {
            ViewResponse.fail(res,"gagal memnghapus data jamaah", error,gagal);
        }
    }
}

export default ControllerJamaah;