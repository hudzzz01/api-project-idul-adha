import prisma from "../prisma/client/client.js";
import CryptoJS from "crypto-js";
import { customAlphabet } from "nanoid";
import deleteFile from "../middleware/deleteFile.js";

const nanoid = customAlphabet('12345678',8);


class ServiceMasjid{
    static async createMasjid(masjid){
        const ciperPassword = CryptoJS.HmacSHA256(masjid.password,"kamu kenapa sini cerita").toString();
        //console.log(ciperPassword)

        try {

            return await prisma.masjid.create({
                data : {
                    uuid:nanoid(),
                    nama:masjid.nama,
                    alamat:masjid.alamat,
                    kode_post:masjid.kode_post,
                    organisasi:masjid.organisasi,
                    phone:masjid.phone,
                    img:masjid.foto,
                }
            })
            
        } catch (error) {
            deleteFile(`uploads/${masjid.foto}`)
            throw new Error(error)
        }
        
        
    }
    static async readAllMasjid(){
        return await prisma.masjid.findMany();
    }
    static async readById(uuid){
        const data = await prisma.masjid.findUnique({
            where:{
                uuid:uuid
            }
        })
        if(!data){
            throw new Error("Data tidak di temukan");
        }
        return data
    }

    // static async readByEmail(email){
        
    //     let data = await prisma.jamaah.findMany({
    //         where:{
    //             email:email
    //         }
    //     })

    //     if(data.length == 0){
    //         throw new Error("email tidak ditemukan");
    //     }
    //     return data
    // }

    static async updateMasjid(uuid,masjid){
        //console.log(id)
        const ciperPassword = CryptoJS.HmacSHA256(masjid.password,"kamu kenapa sini cerita").toString();
        const dataMasjid = await prisma.masjid.findUnique({
            where :{
                uuid:uuid,
            }
        });
        let data = undefined
        try {
                data = await prisma.masjid.update({
                where:{
                    uuid:uuid
                },
                data:{
                    nama:masjid.nama,
                    alamat:masjid.alamat,
                    kode_post:masjid.kode_post,
                    organisasi:masjid.organisasi,
                    phone:masjid.phone,
                    img:masjid.foto,
                }
            })
        } catch (error) {
            deleteFile(`uploads/${masjid.img}`)
            throw new Error(error)
        }

        if(data){
            deleteFile(`uploads/${dataMasjid.img}`)
        }
        return data
    }
    static async deleteMasjid(uuid){
        const data = await prisma.masjid.findUnique({
            where:{
                uuid:uuid,
            }
        })
        if(!data){
            throw new Error('id tidak ditemukan')
        }
        deleteFile(`uploads/${data.img}`)
        return await prisma.masjid.delete({
            where:{
                uuid:uuid
            }
        })
    }
}

export default ServiceMasjid;