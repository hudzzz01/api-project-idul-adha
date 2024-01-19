import prisma from "../prisma/client/client.js";
import CryptoJS from "crypto-js";
import { customAlphabet } from "nanoid";
import deleteFile from "../middleware/deleteFile.js";

const nanoid = customAlphabet('12345678',8);


const kunciEnkripsiPassword = "Mirajmetrics-R4h@5!a";

class ServiceUser{
    static async createUser(user){
        const ciperPassword = CryptoJS.HmacSHA256(user.password,kunciEnkripsiPassword).toString();
        //console.log(ciperPassword)
        const username = await prisma.user.findUnique({
            where:{
                email:user.email,
            }
        })
        if(username){
            deleteFile(`uploads/${user.img}`)
            throw new Error("email telah digunakan");
        }

        try {

            return await prisma.user.create({
                data : {
                    uuid:nanoid(),
                    nama:user.nama,
                    phone:user.phone,
                    email:user.email,
                    address:user.address,
                    password:ciperPassword,
                    img:user.img,
                    role:user.role,
                    uuid_masjid:user.uuid_masjid,
                }
            })
            
        } catch (error) {
            deleteFile(`uploads/${user.img}`)
            throw new Error(error)
        }
        

        
    }
    static async readAllUser(){
        return await prisma.user.findMany();
    }
    static async readById(uuid){
        const data = await prisma.user.findUnique({
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
        
        let data = await prisma.user.findMany({
            where:{
                email:email
            }
        })

        if(data.length == 0){
            throw new Error("email tidak ditemukan");
        }
        return data
    }
    

    static async updateUser(uuid,user){
        //console.log(id)
        const ciperPassword = CryptoJS.HmacSHA256(user.password,kunciEnkripsiPassword).toString();
        const dataUser = await prisma.user.findUnique({
            where :{
                uuid:uuid,
            }
        });
        if(!dataUser){
            deleteFile(`uploads/${user.img}`)
            throw new Error("id tidak ditemukan");
        }
        const username = await prisma.user.findUnique({
            where:{
                email:user.email,
            }
        })
        if(username){
            deleteFile(`uploads/${user.img}`)
            throw new Error("email telah digunakan");
        }
        let data = undefined
        try {
                data = await prisma.user.update({
                where:{
                    uuid:uuid
                },
                data:{
                    nama:user.nama,
                    phone:user.phone,
                    email:user.email,
                    address:user.address,
                    password:ciperPassword,
                    img:user.img,
                    role:user.role,
                    uuid_masjid:user.uuid_masjid,
                }
            })
        } catch (error) {
            deleteFile(`uploads/${user.img}`)
            throw new Error(error)
        }
        
        

        if(data){
            deleteFile(`uploads/${dataUser.img}`)
        }
        return data
    }
    static async deleteUser(uuid){
        const data = await prisma.user.findUnique({
            where:{
                uuid:uuid,
            }
        })
        if(!data){
            throw new Error('id tidak ditemukan')
        }
        deleteFile(`uploads/${data.img}`)
        return await prisma.user.delete({
            where:{
                uuid:uuid
            }
        })
    }
}

export default ServiceUser;