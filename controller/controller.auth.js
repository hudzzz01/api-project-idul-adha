import SendMail from "../middleware/sendmail.js";
import ServiceUser from "../service/service.user.js";
import ViewResponse from "../view/view.response.js";
import Text from "../String/text.js";
import CryptoJS from "crypto-js";
import Token from "../middleware/auth/jwt.js";
import ControllerUser from "./contoller.user.js";
import OTP from "../middleware/otp.generator.js";


let gagal = 200;
const kunciEnkripsiPassword = "Mirajmetrics-R4h@5!a";

class ControllerAuth{
    static async login(req,res){
        try {
            const user = await ServiceUser.readByEmail(req.body.email);
            const ciperPassword = CryptoJS.HmacSHA256(req.body.password,kunciEnkripsiPassword).toString();
            //console.log(ciperPassword)
            //console.log(user[0].password)
            if(user[0].password != ciperPassword){
                throw Error("password salah");
            }

            const token = await Token.createToken({
                uuid : user[0].uuid,
                nama: user[0].nama,
                role : user[0].role,
                uuid_masjid : user[0].uuid_masjid,
            });
            const data = {
                userId:user[0].uuid,
                token:token,
            }
            ViewResponse.success(res,"berhasil login",data,200);
        } catch (error) {
            ViewResponse.fail(res,"gagal login",error,gagal);
        }
    }

    static async resetPassword(req,res){
        try {

            //cari dahulu apakah email tersedia 
            const user = (await ServiceUser.readByEmail(req.body.email))[0];
            console.log(user);

            //buat otp
            const userOTP = await OTP.createOTP(user.email);
            // const valid = await OTP.verifOTP('305494')

            //tambahkan ke format pesan email
            //console.log(userOTP)
            const pesan = Text.textOtp(user.nama,await userOTP)
            //console.log(pesan);
            //return
            
            //kirim ke email dengan yahoo (OTP)
            const send = await SendMail.send(user.email,await pesan)  

            //kirim ke email dengan gmail (OTP)
            //const sendGmail = await SendMail.sendGmail(user.email,await pesan) 
            
            const data = {
                email : user.email,
                message_yahoo : send,
                //message_gmail : sendGmail,
            }

            ViewResponse.success(res,"berhasil kirim email",data,200);
        } catch (error) {
            //console.log(error)
            ViewResponse.fail(res,"gagal kirim email",error,gagal);
        }
    }

    static async validasiOTP(req,res){
        try {
            let otp = req.body.otp;
            let email = req.body.email;
            otp +='';
            const isValid = await OTP.verifOTP(email,otp);
            console.log(isValid);
            if(isValid){
                ViewResponse.success(res,"otp valid",true,200);
            }else{
                ViewResponse.success(res,"otp tidak valid",false,200);
            }
        } catch (error) {
            //console.log(error)
            ViewResponse.fail(res,"kesalahan melakukan verifikasi OTP",error,gagal);
        }
    }
  
}



export default ControllerAuth;