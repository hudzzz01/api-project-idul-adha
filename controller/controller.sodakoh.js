import ServiceSodakoh from "../service/service.sodakoh.js";
import ViewResponse from "../view/view.response.js";



let gagal = 200;
// const kunciEnkripsiPassword = "Mirajmetrics-R4h@5!a";

class ControllerSodakoh{

    
    static async createSodakoh(req,res){
        try {
            const sodakoh = req.body;
            const createSodakoh = await ServiceSodakoh.createSodakoh(sodakoh);
            ViewResponse.success(res,"berhasil membuat sodakoh baru",createSodakoh,200)
        } catch (error) {
            ViewResponse.fail(res,"gagal membuat sodakoh baru",error,gagal);
        }
        
    }
    static async readAllSodakoh(req,res){
        try {
            const sodakohs = await ServiceSodakoh.readAllSodakoh();
            ViewResponse.success(res,"berhasil mengambil data sodakoh",sodakohs,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data sodakoh",error,gagal);
        }
     }

    static async readSodakohById(req,res){
        try {
            const sodakoh = await ServiceSodakoh.readById(req.params.id);
            ViewResponse.success(res,"berhasil mengambil data sodakoh",sodakoh,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data sodakoh",error,gagal);
        }
    }

    static async updateSodakoh(req,res){
        try {
            const sodakoh = req.body;
            const newSodakoh = await ServiceSodakoh.updateSodakoh(req.params.id,sodakoh);
            ViewResponse.success(res,"berhasil mengubah data sodakoh",newSodakoh,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengubah data sodakoh",error,gagal);
        }
    }
    static async deleteSodakoh(req,res){
        try {
            const deleteSodakoh = await ServiceSodakoh.deleteSodakoh(req.params.id);
            ViewResponse.success(res,"berhasil menghapus data sodakoh",deleteSodakoh,200);
        } catch (error) {
            ViewResponse.fail(res,"gagal memnghapus data sodakoh", error,gagal);
        }
    }
}

export default ControllerSodakoh;