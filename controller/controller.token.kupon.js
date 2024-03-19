import ServiceToken from "../service/service.token.js";
import ViewResponse from "../view/view.response.js";



let gagal = 200;


class ControllerTokenKupon{

    static async createTokenKupon(req,res){
        try {
            const token = req.body;
            const createTokenKupon= await ServiceToken.createToken(token);
            ViewResponse.success(res,"berhasil menambahkan Token Kupon baru",createTokenKupon,200)
        } catch (error) {
            ViewResponse.fail(res,"gagal menambahkan data Token Kupon baru",error,gagal);
        }
        
    }
    static async readAllTokenKupon(req,res){
        try {
            const seluruhTokenKupon = await ServiceToken.readAllToken()
            ViewResponse.success(res,"berhasil mengambil data Token Kupon",seluruhTokenKupon,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data Token Kupon",error,gagal);
        }
     }

    static async readTokenKuponById(req,res){
        try {
            const tokenKupon = await ServiceToken.readById(req.params.id);
            ViewResponse.success(res,"berhasil mengambil data tokenKupon",tokenKupon,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengambil data tokenKupon",error,gagal);
        }
    }

    static async updateTokenKupon(req,res){
        try {
            const token = req.body;
            const filename = req.file.filename
            const newTokenKupon = await ServiceToken.updateToken(req.params.id,token,filename);
            ViewResponse.success(res,"berhasil mengubah data kupon",newTokenKupon,200);
        } catch (error) {
            ViewResponse.fail(res,"Gagal mengubah data kupon",error,gagal);
        }
    }
    static async deleteToken(req,res){
        try {
            const deleteTokenKupon = await ServiceToken.deleteToken(req.params.id);
            ViewResponse.success(res,"berhasil menghapus data TokenKupon",deleteTokenKupon,200);
        } catch (error) {
            ViewResponse.fail(res,"gagal memnghapus data Token Kupon", error,gagal);
        }
    }
}

export default ControllerTokenKupon;