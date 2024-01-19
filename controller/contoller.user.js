import ServiceUser from "../service/service.user.js";
import ViewResponse from "../view/view.response.js";



let gagal = 200;
const kunciEnkripsiPassword = "Mirajmetrics-R4h@5!a";

class ControllerUser{
    
    static async createUser(req,res){
        try {
            const user = req.body;
            user.img = req.file.filename;
            const createUser = await ServiceUser.createUser(user);
            ViewResponse.success(res,"berhasil membuat user baru",createUser,200)
        } catch (error) {
            ViewResponse.fail(res,"gagal membuat user baru",error,gagal);
        }
        
    }
    static async readAllUser(req,res){
        try {
            const users = await ServiceUser.readAllUser();
            ViewResponse.success(res,"berhasil mengambil data user",users,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data user",error,gagal);
        }
     }

    static async readUserById(req,res){
        try {
            const user = await ServiceUser.readById(req.params.id);
            ViewResponse.success(res,"berhasil mengambil data user",user,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data user",error,gagal);
        }
    }

    static async updateUser(req,res){
        try {
            const user = req.body;
            user.img = req.file.filename;
            const newUser = await ServiceUser.updateUser(req.params.id,user);
            ViewResponse.success(res,"berhasil mengubah data user",newUser,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengubah data user",error,gagal);
        }
    }
    static async deleteUser(req,res){
        try {
            const deleteUser = await ServiceUser.deleteUser(req.params.id);
            ViewResponse.success(res,"berhasil menghapus data user",deleteUser,200);
        } catch (error) {
            ViewResponse.fail(res,"gagal memnghapus data user", error,gagal);
        }
    }
}

export default ControllerUser;