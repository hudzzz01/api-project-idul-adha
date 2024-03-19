import prisma from "../prisma/client/client.js";
import { customAlphabet } from "nanoid";
import deleteFile from "../middleware/deleteFile.js";

const nanoid = customAlphabet('12345678',8);


class ServicePenerima{
    static async createPenerima(penerima,userLogin){

        try{
            return await prisma.penerima.create({
                data : {
                    uuid:nanoid(),
                    tipe_token:penerima.tipe_token,
                    nama_penerima:penerima.nama_penerima,
                    uuid_masjid:userLogin.data.uuid_masjid,
                }
            })
            
        } catch (error) {
            throw new Error(error)
        }
        
        
    }
    static async readAllPenerima(){
        return await prisma.penerima.findMany();
    }
    static async readById(uuid){
        const data = await prisma.penerima.findUnique({
            where:{
                uuid:uuid
            }
        })
        if(!data){
            throw new Error("Data tidak di temukan");
        }
        return data
    }


    static async updatePenerima(uuid,penerima,userLogin){
        
        const dataPenerima = await prisma.penerima.findUnique({
            where :{
                uuid:uuid,
            }
        });
        let data = undefined
        try {
                console.log(userLogin)
                data = await prisma.penerima.update({
                where:{
                    uuid:uuid
                },
                data:{
                    tipe_token:penerima.tipe_token,
                    nama_penerima:penerima.nama_penerima,
                    uuid_masjid:userLogin.data.uuid_masjid,
                }
            })
        } catch (error) {
            throw new Error(error)
        }

        return await data
    }
    static async deletePenerima(uuid){
        const data = await prisma.penerima.findUnique({
            where:{
                uuid:uuid,
            }
        })
        if(!data){
            throw new Error('id tidak ditemukan')
        }
        return await prisma.penerima.delete({
            where:{
                uuid:uuid
            }
        })
    }
}

export default ServicePenerima;