import ViewResponse from "../../view/view.response.js";
import Token from "./jwt.js";

const auth = async(req,res,next)=>{
    if(!req.headers.authorization){
        ViewResponse.fail(res,"Token tidak ditemukan","",404)
        return
    }
    const bearer = req.headers.authorization.split("Bearer ")[1];
    const resultAuth = await Token.decodeToken(bearer);
    if(!resultAuth){
        ViewResponse.fail(res,"Token tidak valid","",404)
        return
    }
    req.user = resultAuth;
    next()
}

export default auth;