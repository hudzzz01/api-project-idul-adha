import prisma from "../prisma/client/client.js";
import CryptoJS from "crypto-js";
import { customAlphabet } from "nanoid";
// import deleteFile from "../middleware/deleteFile.js";

const nanoid = customAlphabet('12345678',8);
const isiToken = customAlphabet('12345678',5);


class ServiceToken{
    static async createToken(token){

        try {
            let nomorToken = 1;
            const banyakToken = await prisma.tokens.findMany();
            console.log(isiToken())

            if(await banyakToken.length != 0){
                // console.log(banyakToken.length-1)
                banyakToken.sort((a,b)=>{
                    return Number(a.nomor_kupon)-Number(b.nomor_kupon)
                })
                // console.log(banyakToken[banyakToken.length-1].nomor_kupon)
                nomorToken += Number(banyakToken[banyakToken.length-1].nomor_kupon)
            }

            nomorToken = String(nomorToken);
            console.log(nomorToken)
            console.log(token)
            return await prisma.tokens.create({
                data : {
                    uuid:nanoid(),
                    isi_token:isiToken(),
                    nomor_kupon:nomorToken,
                    uuid_penerima:token.uuid_penerima,
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    static async readAllToken(){
        return (await prisma.tokens.findMany()).sort((a,b)=>{
            return Number(a.nomor_kupon)-Number(b.nomor_kupon)
        });
    }
    static async readById(uuid){
        const data = await prisma.tokens.findUnique({
            where:{
                uuid:uuid
            }
        })
        if(!data){
            throw new Error("Data tidak di temukan");
        }
        return data
    }


    static async updateToken(uuid,token,foto_penerima){
        //console.log(id)
        const dataToken = await prisma.tokens.findUnique({
            where :{
                uuid:uuid,
            }
        });

        if(!dataToken){
            throw new Error("uuid token tidak ditemukan")
        }

        let data = undefined
        try {
                data = await prisma.tokens.update({
                where:{
                    uuid:uuid
                },
                data:{
                    nomor_kupon:token.nomor_kupon,
                    isi_token:token.isi_token,
                    is_verif:token.is_verif,
                    uuid_penerima:token.uuid_penerima,
                    verified_by_uuid_user:token.verified_by_uuid_user,
                    foto_penerima:foto_penerima,
                }
            })
        } catch (error) {
            throw new Error(error)
        }
        return data
    }
    static async deleteToken(uuid){
        const data = await prisma.tokens.findUnique({
            where:{
                uuid:uuid,
            }
        })
        if(!data){
            throw new Error('id tidak ditemukan')
        }
        
        return await prisma.tokens.delete({
            where:{
                uuid:uuid
            }
        })
    }

    static async ubahPenerimaToken(uuid_token,uuid_penerima){
        try {
            const dataPenerima = await prisma.penerima.findUnique({
                where :{
                    uuid:uuid_penerima,
                }
            })

            if(!dataPenerima){
                throw new Error('uuid penerima tidak ditemuakn')
            }

            const dataToken = await prisma.tokens.findUnique({
                where :{
                    uuid:uuid_token,
                }
            })

            if(!dataToken){
                throw new Error('uuid penerima tidak ditemuakn')
            }

            const dataTokenYangBaru = await prisma.tokens.update({
                where:{
                    uuid: uuid_token
                },
                data:{
                    uuid_penerima:uuid_penerima,
                }
            })

            return dataTokenYangBaru

        } catch (error) {
            throw new Error(error);
        }
    }

    static async verifToken(uuid,uuid_user,isVerif,foto_penerima){
        try{
            const dataUser = await prisma.user.findUnique({
                where:{
                    uuid:uuid_user,
                }
            })
            const data = await prisma.tokens.findUnique({
                where:{
                    uuid:uuid,
                }
            })
            if(!data || !dataUser){
                throw new Error('id tidak ditemukan')
            }

            const newData = await prisma.tokens.update({
                where:{
                    uuid:uuid,
                },
                data :{
                    is_verif: isVerif,
                    verified_by_uuid_user: uuid_user,
                    foto_penerima : foto_penerima,
                },
            })

            return newData

        }catch(error){
            throw new Error(error)
        }
    }

}

export default ServiceToken;