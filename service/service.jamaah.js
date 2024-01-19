import prisma from "../prisma/client/client.js";
import CryptoJS from "crypto-js";
import { customAlphabet } from "nanoid";
import deleteFile from "../middleware/deleteFile.js";

const nanoid = customAlphabet('12345678',8);


class ServiceJamaah{
    static async createJamaah(jamaah){
        const ciperPassword = CryptoJS.HmacSHA256(jamaah.password,"kamu kenapa sini cerita").toString();
        //console.log(ciperPassword)
        const uuid_masjid = await prisma.masjid.findUnique({
            where:{
                uuid:jamaah.uuid_masjid,
            }
        })
        if(!uuid_masjid){
            deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("uuid masjid tidak terdaftar");
        }

        try {

            return await prisma.Jamaah.create({
                data : {
                    uuid:nanoid(),
                    nama:jamaah.nama,
                    nama_bapak:jamaah.nama_bapak,
                    alamat:jamaah.alamat,
                    no_telepon:jamaah.no_telepon,
                    uuid_masjid:jamaah.uuid_masjid,
                    foto:jamaah.foto
                }
            })
            
        } catch (error) {
            deleteFile(`uploads/${jamaah.foto}`)
            throw new Error(error)
        }
        

        
    }
    static async readAllJamaah(){
        return await prisma.jamaah.findMany();
    }
    static async readById(uuid){
        const data = await prisma.jamaah.findUnique({
            where:{
                uuid:uuid
            }
        })
        if(!data){
            throw new Error("Data tidak di temukan");
        }
        return data
    }

    static async readByEmail(email){
        
        let data = await prisma.jamaah.findMany({
            where:{
                email:email
            }
        })

        if(data.length == 0){
            throw new Error("email tidak ditemukan");
        }
        return data
    }
    

    static async updateJamaah(uuid,jamaah){
        //console.log(id)
        const ciperPassword = CryptoJS.HmacSHA256(jamaah.password,"kamu kenapa sini cerita").toString();
        const dataJamaah = await prisma.jamaah.findUnique({
            where :{
                uuid:uuid,
            }
        });
        if(!dataJamaah){
            deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("id tidak ditemukan");
        }
        const uuid_masjid = await prisma.masjid.findUnique({
            where:{
                uuid:jamaah.uuid_masjid,
            }
        })
        if(!uuid_masjid){
            deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("uuid masjid tidak terdaftar");
        }
        let data = undefined
        try {
                data = await prisma.jamaah.update({
                where:{
                    uuid:uuid
                },
                data:{
                    nama:jamaah.nama,
                    nama_bapak:jamaah.nama_bapak,
                    alamat:jamaah.alamat,
                    no_telepon:jamaah.no_telepon,
                    uuid_masjid:jamaah.uuid_masjid,
                    foto:jamaah.foto
                }
            })
        } catch (error) {
            deleteFile(`uploads/${jamaah.foto}`)
            throw new Error(error)
        }
        
        

        if(data){
            deleteFile(`uploads/${dataJamaah.foto}`)
        }
        return data
    }
    static async deleteJamaah(uuid){
        const data = await prisma.jamaah.findUnique({
            where:{
                uuid:uuid,
            }
        })
        if(!data){
            throw new Error('id tidak ditemukan')
        }
        deleteFile(`uploads/${data.foto}`)
        return await prisma.jamaah.delete({
            where:{
                uuid:uuid
            }
        })
    }
}

export default ServiceJamaah;