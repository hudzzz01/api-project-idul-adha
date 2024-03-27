import ServiceFamily from "../service/service.family.js";
import ServiceFidyah from "../service/service.fidyah.js";
import ViewResponse from "../view/view.response.js";



let gagal = 200;
// const kunciEnkripsiPassword = "Mirajmetrics-R4h@5!a";

class ControllerFidyah{

    
    static async createFidyah(req,res){
        try {
            const fidyah = req.body;
            const createFidyah = await ServiceFidyah.createFidyah(fidyah);
            ViewResponse.success(res,"berhasil membuat fidyah baru",createFidyah,200)
        } catch (error) {
            ViewResponse.fail(res,"gagal membuat fidyah baru",error,gagal);
        }
        
    }
    static async readAllFidyah(req,res){
        try {
            const fidyahs = await ServiceFidyah.readAllFidyah();
            ViewResponse.success(res,"berhasil mengambil data fidyah",fidyahs,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data fidyah",error,gagal);
        }
     }

    static async readFidyahById(req,res){
        try {
            const fidyah = await ServiceFidyah.readById(req.params.id);
            ViewResponse.success(res,"berhasil mengambil data fidyah",fidyah,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data fidyah",error,gagal);
        }
    }

    static async readFidyahByIdWithPagination(req,res){
        try {
            //console.log("aaaa")
            const page = req.query.page;
            const pageTotal = req.query.totalPage;
            const fidyah = await ServiceFidyah.readAllFidyahWithPagination(page,pageTotal);
            ViewResponse.success(res,"berhasil mengambil data fidyah",fidyah,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data fidyah",error,gagal);
        }
    }

    static async updateFidyah(req,res){
        try {
            const fidyah = req.body;
            const newFidyah = await ServiceFidyah.updateFidyah(req.params.id,fidyah);
            ViewResponse.success(res,"berhasil mengubah data fidyah",newFidyah,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengubah data fidyah",error,gagal);
        }
    }
    static async deleteFidyah(req,res){
        try {
            const deleteFidyah = await ServiceFidyah.deleteFidyah(req.params.id);
            ViewResponse.success(res,"berhasil menghapus data fidyah",deleteFidyah,200);
        } catch (error) {
            ViewResponse.fail(res,"gagal memnghapus data fidyah", error,gagal);
        }
    }
}

export default ControllerFidyah;