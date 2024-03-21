import prisma from "../prisma/client/client.js";
import CryptoJS from "crypto-js";
import { customAlphabet } from "nanoid";
//import deleteFile from "../middleware/deleteFile.js";

const nanoid = customAlphabet('12345678',8);


class ServiceSodakoh{
    static async createSodakoh(sodakoh){
        //const ciperPassword = CryptoJS.HmacSHA256(jamaah.password,"kamu kenapa sini cerita").toString();
        //console.log(ciperPassword)
        const uuid_family = await prisma.family.findUnique({
            where:{
                uuid:sodakoh.uuid_family,
            }
        })
        if(!uuid_family){
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("uuid family tidak terdaftar");
        }

        try {
            sodakoh.jumlah_sodakoh =  parseInt(sodakoh.jumlah_sodakoh);
            sodakoh.tahun = parseInt(sodakoh.tahun);
            return await prisma.sodakoh.create({
                data : {
                    uuid:nanoid(),
                    uuid_family:sodakoh.uuid_family,
                    jumlah_sodakoh:sodakoh.jumlah_sodakoh,
                    tahun:sodakoh.tahun,
                }
            })
            
        } catch (error) {
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error(error)
        }
        

        
    }
    static async readAllSodakoh(){
        return await prisma.sodakoh.findMany();
    }
    static async readById(uuid){
        const data = await prisma.sodakoh.findUnique({
            where:{
                uuid:uuid
            }
        })
        if(!data){
            throw new Error("Data tidak di temukan");
        }
        return data
    }
    
    static async readByFamilyId(uuid_family){
        const data = await prisma.sodakoh.findMany({
            where:{
                uuid_family:uuid_family
            }
        })
        if(data.length == 0){
            throw new Error("Data tidak di temukan");
        }
        return data[0]
    }

    static async updateSodakoh(uuid,sodakoh){
        //console.log(id)
        //const ciperPassword = CryptoJS.HmacSHA256(jamaah.password,"kamu kenapa sini cerita").toString();
        const dataSodakoh = await prisma.sodakoh.findUnique({
            where :{
                uuid:uuid,
            }
        });
        if(!dataSodakoh){
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("id tidak ditemukan");
        }
        
        const uuid_family = await prisma.family.findUnique({
            where:{
                uuid:sodakoh.uuid_family,
            }
        })
        if(!uuid_family){
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("uuid family tidak terdaftar");
        }
        let data = undefined
        try {
                sodakoh.jumlah_sodakoh =  parseInt(sodakoh.jumlah_sodakoh);
                sodakoh.tahun = parseInt(sodakoh.tahun);
                data = await prisma.sodakoh.update({
                where:{
                    uuid:uuid
                },
                data:{
                    uuid_family:sodakoh.uuid_family,
                    jumlah_sodakoh:sodakoh.jumlah_sodakoh,
                    tahun:sodakoh.tahun,
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
    static async deleteSodakoh(uuid){
        const data = await prisma.sodakoh.findUnique({
            where:{
                uuid:uuid,
            }
        })
        if(!data){
            throw new Error('id tidak ditemukan')
        }
        //deleteFile(`uploads/${data.foto}`)
        return await prisma.sodakoh.delete({
            where:{
                uuid:uuid
            }
        })
    }
}

export default ServiceSodakoh;