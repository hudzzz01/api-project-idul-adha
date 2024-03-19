import prisma from "../prisma/client/client.js";
import CryptoJS from "crypto-js";
import { customAlphabet } from "nanoid";
//import deleteFile from "../middleware/deleteFile.js";

const nanoid = customAlphabet('12345678',8);


class ServiceZakat{
    static async createZakat(zakat){
        //const ciperPassword = CryptoJS.HmacSHA256(jamaah.password,"kamu kenapa sini cerita").toString();
        //console.log(ciperPassword)
        const uuid_family = await prisma.family.findUnique({
            where:{
                uuid:zakat.uuid_family,
            }
        })
        if(!uuid_family){
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("uuid family tidak terdaftar");
        }   

        try {
            zakat.jumlah_zakat =  parseInt(zakat.jumlah_zakat);
            zakat.tahun = parseInt(zakat.tahun);
            return await prisma.zakat.create({
                data : {
                    uuid:nanoid(),
                    uuid_family:zakat.uuid_family,
                    jumlah_zakat:zakat.jumlah_zakat,
                    tahun:zakat.tahun,
                }
            })
            
        } catch (error) {
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error(error)
        }
        

        
    }
    static async readAllZakat(){
        return await prisma.zakat.findMany();
    }
    static async readById(uuid){
        const data = await prisma.zakat.findUnique({
            where:{
                uuid:uuid
            }
        })
        if(!data){
            throw new Error("Data tidak di temukan");
        }
        return data
    }
    

    static async updateZakat(uuid,zakat){
        //console.log(id)
        //const ciperPassword = CryptoJS.HmacSHA256(jamaah.password,"kamu kenapa sini cerita").toString();
        const dataZakat = await prisma.zakat.findUnique({
            where :{
                uuid:uuid,
            }
        });
        if(!dataZakat){
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("id tidak ditemukan");
        }
        
        const uuid_family = await prisma.family.findUnique({
            where:{
                uuid:zakat.uuid_family,
            }
        })
        if(!uuid_family){
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("uuid family tidak terdaftar");
        }
        let data = undefined
        try {
                zakat.jumlah_zakat =  parseInt(zakat.jumlah_zakat);
                zakat.tahun = parseInt(zakat.tahun);
                data = await prisma.zakat.update({
                where:{
                    uuid:uuid
                },
                data:{
                    uuid_family:zakat.uuid_family,
                    jumlah_zakat:zakat.jumlah_zakat,
                    tahun:zakat.tahun,
                }
            })
        } catch (error) {
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error(error)
        }
        
        

        if(data){
            //deleteFile(`uploads/${dataJamaah.foto}`)
        }
        return data
    }
    static async deleteZakat(uuid){
        const data = await prisma.zakat.findUnique({
            where:{
                uuid:uuid,
            }
        })
        if(!data){
            throw new Error('id tidak ditemukan')
        }
        //deleteFile(`uploads/${data.foto}`)
        return await prisma.zakat.delete({
            where:{
                uuid:uuid
            }
        })
    }
}

export default ServiceZakat;