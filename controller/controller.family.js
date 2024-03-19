import ServiceFamily from "../service/service.family.js";
import ViewResponse from "../view/view.response.js";



let gagal = 200;
// const kunciEnkripsiPassword = "Mirajmetrics-R4h@5!a";

class ControllerFamily{

    
    static async createFamily(req,res){
        try {
            const family = req.body;
            const createFamily = await ServiceFamily.createFamily(family);
            ViewResponse.success(res,"berhasil membuat keluarga/family baru",createFamily,200)
        } catch (error) {
            ViewResponse.fail(res,"gagal membuat keluarga/family baru",error,gagal);
        }
        
    }
    static async readAllFamily(req,res){
        try {
            const familys = await ServiceFamily.readAllFamily();
            ViewResponse.success(res,"berhasil mengambil data keluarga/family",familys,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data keluarga/family",error,gagal);
        }
     }

    static async readFamilyById(req,res){
        try {
            const family = await ServiceFamily.readById(req.params.id);
            ViewResponse.success(res,"berhasil mengambil data keluarga/family",family,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data keluarga/family",error,gagal);
        }
    }

    static async updateFamily(req,res){
        try {
            const family = req.body;
            const newFamily = await ServiceFamily.updateFamily(req.params.id,family);
            ViewResponse.success(res,"berhasil mengubah data keluarga/family",newFamily,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengubah data keluarga/family",error,gagal);
        }
    }
    static async deleteFamily(req,res){
        try {
            const deleteFamily = await ServiceFamily.deleteFamily(req.params.id);
            ViewResponse.success(res,"berhasil menghapus data keluarga/family",deleteFamily,200);
        } catch (error) {
            ViewResponse.fail(res,"gagal memnghapus data keluarga/family", error,gagal);
        }
    }
}

export default ControllerFamily;