class ViewResponse{
    static success(res,message,data,code){
        res.status(code).json({
            status:"ok",
            message:message,
            data:data
        })
    }

    static fail(res,message,error,code){
        res.status(code).json({
            status:"fail",
            message:message,
            error:`${error}`,
        })
    }
}

export default ViewResponse;