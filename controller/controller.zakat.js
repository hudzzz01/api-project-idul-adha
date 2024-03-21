import ServiceFamily from "../service/service.family.js";
import ServiceZakat from "../service/service.zakat.js";
import ViewResponse from "../view/view.response.js";



let gagal = 200;
// const kunciEnkripsiPassword = "Mirajmetrics-R4h@5!a";

class ControllerZakat{

    
    static async createZakat(req,res){
        try {
            const zakat = req.body;
            const createZakat = await ServiceZakat.createZakat(zakat);
            ViewResponse.success(res,"berhasil membuat zakat baru",createZakat,200)
        } catch (error) {
            ViewResponse.fail(res,"gagal membuat zakat baru",error,gagal);
        }
        
    }
    static async readAllZakat(req,res){
        try {
            const zakats = await ServiceZakat.readAllZakat();
            ViewResponse.success(res,"berhasil mengambil data zakat",zakats,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data zakat",error,gagal);
        }
     }

    static async readZakatById(req,res){
        try {
            const zakat = await ServiceZakat.readById(req.params.id);
            ViewResponse.success(res,"berhasil mengambil data zakat",zakat,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data zakat",error,gagal);
        }
    }

    static async readZakatByIdWithPagination(req,res){
        try {
            console.log("aaaa")
            const page = req.query.page;
            const pageTotal = req.query.totalPage;
            const zakat = await ServiceZakat.readAllZakatWithPagination(page,pageTotal);
            ViewResponse.success(res,"berhasil mengambil data zakat",zakat,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data zakat",error,gagal);
        }
    }

    static async updateZakat(req,res){
        try {
            const zakat = req.body;
            const newZakat = await ServiceZakat.updateZakat(req.params.id,zakat);
            ViewResponse.success(res,"berhasil mengubah data zakat",newZakat,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengubah data zakat",error,gagal);
        }
    }
    static async deleteZakat(req,res){
        try {
            const deleteZakat = await ServiceZakat.deleteZakat(req.params.id);
            ViewResponse.success(res,"berhasil menghapus data zakat",deleteZakat,200);
        } catch (error) {
            ViewResponse.fail(res,"gagal memnghapus data zakat", error,gagal);
        }
    }
}

export default ControllerZakat;