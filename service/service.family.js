import prisma from "../prisma/client/client.js";
import CryptoJS from "crypto-js";
import { customAlphabet } from "nanoid";
//import deleteFile from "../middleware/deleteFile.js";

const nanoid = customAlphabet('12345678',8);


class ServiceFamily{
    static async createFamily(family){
    
        try {

            return await prisma.family.create({
                data : {
                    uuid:nanoid(),
                    nama_kepala_keluarga:family.nama_kepala_keluarga,
                    tempat_lahir:family.tempat_lahir,
                    tanggal_lahir:family.tanggal_lahir,
                    alamat:family.alamat,
                    kelurahan:family.kelurahan,
                    kecamatan:family.kecamatan,
                    kota_atau_kabupaten:family.kota_atau_kabupaten,
                    no_hp_wa:family.no_hp_wa,
                    no_hp_alternatif:family.no_hp_alternatif,
                    email:family.email
                }
            })
            
        } catch (error) {
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error(error)
        }
        

        
    }
    static async readAllFamily(){
        return await prisma.family.findMany();
    }
    static async readById(uuid){
        const data = await prisma.family.findMany({
            where:{
                uuid:uuid
            }
        })
        if(data.length == 0){
            throw new Error("Data tidak di temukan");
        }
        return data[0]
    }

    static async readByEmail(email){
        
        let data = await prisma.family.findMany({
            where:{
                email:email
            }
        })

        if(data.length == 0){
            throw new Error("email tidak ditemukan");
        }
        return data
    }
    

    static async updateFamily(uuid,family){
        //console.log(id)
        //const ciperPassword = CryptoJS.HmacSHA256(jamaah.password,"kamu kenapa sini cerita").toString();
        const dataFamily = await prisma.family.findUnique({
            where :{
                uuid:uuid,
            }
        });
        if(!dataFamily){
            //deleteFile(`uploads/${jamaah.foto}`)
            throw new Error("id tidak ditemukan");
        }
        
        let data = undefined
        try {
                data = await prisma.family.update({
                where:{
                    uuid:uuid
                },
                data:{
                    nama_kepala_keluarga:family.nama_kepala_keluarga,
                    tempat_lahir:family.tempat_lahir,
                    tanggal_lahir:family.tanggal_lahir,
                    alamat:family.alamat,
                    kelurahan:family.kelurahan,
                    kecamatan:family.kecamatan,
                    kota_atau_kabupaten:family.kota_atau_kabupaten,
                    no_hp_wa:family.no_hp_wa,
                    no_hp_alternatif:family.no_hp_alternatif,
                    email:family.email
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
    static async deleteFamily(uuid){
        const data = await prisma.family.findUnique({
            where:{
                uuid:uuid,
            }
        })
        if(!data){
            throw new Error('id tidak ditemukan')
        }
        //deleteFile(`uploads/${data.foto}`)
        return await prisma.family.delete({
            where:{
                uuid:uuid
            }
        })
    }
}

export default ServiceFamily;