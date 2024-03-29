import prisma from "../prisma/client/client.js";
import CryptoJS from "crypto-js";
import { customAlphabet } from "nanoid";
//import deleteFile from "../middleware/deleteFile.js";

const nanoid = customAlphabet('12345678',8);


class ServiceFidyah{
    static async createFidyah(fidyah){
        //const ciperPassword = CryptoJS.HmacSHA256(jamaah.password,"kamu kenapa sini cerita").toString();
        //console.log(ciperPassword)
        const uuid_family = await prisma.family.findUnique({
            where:{
                uuid:fidyah.uuid_family,
            }
        })
        if(!uuid_family){
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("uuid family tidak terdaftar");
        }

        const uuid_jamaah = await prisma.jamaah.findUnique({
            where:{
                uuid:fidyah.uuid_jamaah,
            }
        })
        if(!uuid_jamaah){
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("uuid family tidak terdaftar");
        }

        try {
            fidyah.jumlah_fidyah =  parseInt(fidyah.jumlah_fidyah);
            fidyah.tahun = parseInt(fidyah.tahun);
            return await prisma.fidyah.create({
                data : {
                    uuid:nanoid(),
                    uuid_family:fidyah.uuid_family,
                    uuid_jamaah:fidyah.uuid_jamaah,
                    jumlah_fidyah:fidyah.jumlah_fidyah,
                    tahun:fidyah.tahun,
                    tim : fidyah.tim,
                }
            })
            
        } catch (error) {
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error(error)
        }
        

        
    }
    static async readAllFidyah(){
        return await prisma.fidyah.findMany();
    }
    static async readById(uuid){
        const data = await prisma.fidyah.findUnique({
            where:{
                uuid:uuid
            }
        })
        if(!data){
            throw new Error("Data tidak di temukan");
        }
        return data
    }

    static async readByTeam(tim){
        const data = await prisma.fidyah.findMany({
            where:{
                tim:tim
            }
        })
        
        return data
    }
    
    static async readByFamilyId(uuid_family){
        const data = await prisma.fidyah.findMany({
            where:{
                uuid_family:uuid_family
            }
        })
        if(data.length == 0){
            throw new Error("Data tidak di temukan");
        }
        return data[0]
    }

    static async updateFidyah(uuid,fidyah){
        //console.log(id)
        //const ciperPassword = CryptoJS.HmacSHA256(jamaah.password,"kamu kenapa sini cerita").toString();
        const dataFidyah = await prisma.fidyah.findUnique({
            where :{
                uuid:uuid,
            }
        });
        if(!dataFidyah){
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("id tidak ditemukan");
        }
        
        const uuid_family = await prisma.family.findUnique({
            where:{
                uuid:fidyah.uuid_family,
            }
        })
        if(!uuid_family){
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("uuid family tidak terdaftar");
        }
        let data = undefined
        try {
                fidyah.jumlah_fidyah =  parseInt(fidyah.jumlah_fidyah);
                fidyah.tahun = parseInt(fidyah.tahun);
                data = await prisma.fidyah.update({
                where:{
                    uuid:uuid
                },
                data:{
                    uuid_family:fidyah.uuid_family,
                    jumlah_fidyah:fidyah.jumlah_fidyah,
                    tahun:fidyah.tahun,
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
    static async deleteFidyah(uuid){
        const data = await prisma.fidyah.findUnique({
            where:{
                uuid:uuid,
            }
        })
        if(!data){
            throw new Error('id tidak ditemukan')
        }
        //deleteFile(`uploads/${data.foto}`)
        return await prisma.fidyah.delete({
            where:{
                uuid:uuid
            }
        })
    }
}

export default ServiceFidyah;