import { customAlphabet } from "nanoid";
import Token from "../../middleware/auth/jwt.js";
import ViewResponse from "../../view/view.response.js";
import CryptoJS from "crypto-js";
import ServiceFamily from "../../service/service.family.js";
import ServiceZakat from "../../service/service.zakat.js";
import ServiceJamaah from "../../service/service.jamaah.js";
import ServiceSodakoh from "../../service/service.sodakoh.js";
import ControllerZakat from "../controller.zakat.js";
import ServiceMasjid from "../../service/service.masjid.js";
import ControllerFamily from "../controller.family.js";
import ControllerJamaah from "../controller.jamaah.js";
import ServiceFidyah from "../../service/service.fidyah.js";
const nanoid = customAlphabet("12345678", 8);

let gagal = 200;
// const kunciEnkripsiPassword = "Mirajmetrics-R4h@5!a";

class ControllerInputZakatV1 {

  static async kesimpulan(req, res) {
    try {
      const jumlahKeluarga = (await ServiceFamily.readAllFamily()).length;
      const jumlahJamah = (await ServiceJamaah.readAllJamaah()).length;
      let jumlahSeluruhZakat = 0;
      let jumlahSeluruhSodakoh = 0;
      let jumlahSeluruhfidyah = 0;
      const zakats = await ServiceZakat.readAllZakat();
      for (let i = 0; i < zakats.length; i++) {
        const zakat = zakats[i];

        jumlahSeluruhZakat += await parseInt(zakat.jumlah_zakat);
      }
      const sodakohs = await ServiceSodakoh.readAllSodakoh();
      for (let i = 0; i < sodakohs.length; i++) {
        const sodakoh = sodakohs[i];

        jumlahSeluruhSodakoh += await parseInt(sodakoh.jumlah_sodakoh);
        
      }

      const fidyahs = await ServiceFidyah.readAllFidyah();
      for (let i = 0; i < fidyahs.length; i++) {
        const fidyah = fidyahs[i];

        jumlahSeluruhfidyah += await parseInt(fidyah.jumlah_fidyah);
        
      }



      const jumlahSeluruhnya = jumlahSeluruhSodakoh + jumlahSeluruhZakat + jumlahSeluruhfidyah;

      let myData = {
        jumlahKeluarga: jumlahKeluarga,
        jumlahJamah: jumlahJamah,
        jumlahSeluruhZakat: jumlahSeluruhZakat,
        jumlahSeluruhSodakoh: jumlahSeluruhSodakoh,
        jumlahSeluruhfidyah: jumlahSeluruhfidyah,
        jumlahSeluruhnya: jumlahSeluruhnya,
      };
      ViewResponse.success(
        res,
        "berhasil menghapus data kesimpulan ",
        myData,
        200
      );
    } catch (error) {
      ViewResponse.fail(res, "gagal mengabil kesimplan", error, gagal);
    }
  }

  static async deletePembayaranZakat(req, res) {
    try {
      console.log("Delete pembayaran Zakat => ")
      let uuid_zakat = req.params.uuid;
      console.log(uuid_zakat);

      const zakat = await ServiceZakat.readById(uuid_zakat);
      const sodakoh = await ServiceSodakoh.readByFamilyId(zakat.uuid_family);

      const delFalimy = await ServiceFamily.deleteFamily(zakat.uuid_family);

      ViewResponse.success(
        res,
        "berhasil menghapus data zakat beserta family dan anggotanya",
        { delFalimy, zakat, sodakoh },
        200
      );
    } catch (error) {
      ViewResponse.fail(res, "gagal menghapus data zakat baru", error, gagal);
    }
  }

  static async seluruhPembayaranZakatWithPagination(req, res) {
    try {
      console.log("Get all Zakat With Pagination => ")
      let results = [];
      const page = req.query.page;
      const pageTotal = req.query.totalPage;
      const zakats = await ServiceZakat.readAllZakatWithPagination(
        page,
        pageTotal
      );

      
      let banyakZakat = zakats.length;

      for (let i = 0; i < zakats.length; i++) {
        const zakat = zakats[i];
        const family = await ServiceFamily.readById(zakat.uuid_family);
        const jamaahs = await ServiceJamaah.readByFamilyId(zakat.uuid_family);
        const sodakoh = await ServiceSodakoh.readByFamilyId(zakat.uuid_family);
        const fidyah = await ServiceFidyah.readByFamilyId(zakat.uuid_family);
        const jumlah_fidyah = fidyah.jumlah_fidyah;
        const jumlah_sodakoh = sodakoh.jumlah_sodakoh;
        //console.log(jumlah_fidyah);
        results.push({
          uuid_zakat: await zakat.uuid,
          id_keluarga: await zakat.uuid_family,
          nama_kepala_keluarga: await family.nama_kepala_keluarga,
          anggota_keluarga: await jamaahs,
          jumlah_anggota_keluarga: await jamaahs.length,
          jumlah_pembayaran_zakat: await zakat.jumlah_zakat,
          jumlah_pembayaran_sodaqoh: jumlah_sodakoh,
          jumlah_pembayaran_fidyah : jumlah_fidyah,
          total_bayar: (await zakat.jumlah_zakat) + jumlah_sodakoh + jumlah_fidyah,
          banyakKeluarga: await banyakZakat,
        });

        
      }
      ViewResponse.success(
        res,
        "berhasil ambil seluruh data zakat yang telah di input",
        results,
        200
      );
    } catch (error) {
      ViewResponse.fail(res, "gagal ambil data", error, gagal);
    }
  }

  static async seluruhPembayaranZakat(req, res) {
    try {
      console.log("Get all Zakat => ")
      let results = [];

      let zakats = await ServiceZakat.readAllZakat();
      let banyakZakat = zakats.length;

      for (let i = 0; i < zakats.length; i++) {
        const zakat = zakats[i];
        const family = await ServiceFamily.readById(zakat.uuid_family);
        const jamaahs = await ServiceJamaah.readByFamilyId(zakat.uuid_family);
        const sodakoh = await ServiceSodakoh.readByFamilyId(zakat.uuid_family);
        const fidyah = await ServiceFidyah.readByFamilyId(zakat.uuid_family);
        const jumlah_fidyah = fidyah.jumlah_fidyah;
        const jumlah_sodakoh = sodakoh.jumlah_sodakoh;
        console.log(jumlah_fidyah);
        results.push({
          uuid_zakat: await zakat.uuid,
          id_keluarga: await zakat.uuid_family,
          nama_kepala_keluarga: await family.nama_kepala_keluarga,
          anggota_keluarga: await jamaahs,
          jumlah_anggota_keluarga: await jamaahs.length,
          jumlah_pembayaran_zakat: await zakat.jumlah_zakat,
          jumlah_pembayaran_sodaqoh: jumlah_sodakoh,
          jumlah_pembayaran_fidyah : jumlah_fidyah,
          total_bayar: (await zakat.jumlah_zakat) + jumlah_sodakoh + jumlah_fidyah,
          banyakKeluarga: await banyakZakat,
        });
        
      }
      ViewResponse.success(
        res,
        "berhasil ambil seluruh data zakat yang telah di input",
        results,
        200
      );
    } catch (error) {
      ViewResponse.fail(res, "gagal ambil data", error, gagal);
    }
  }

  static async inputZakatJamaah(req, res) {
    console.log("Post input Zakat => ")
    /*
        Bentuk data yang masuk sebagai berikut :
        biodata

        nama_lengkap : ""
        tempat_lahir : ""
        tanggal_lahir : "00-00-0000"
        alamat : ""
        kota_atau_kabupaten : ""
        No.HP (wa) : ""
        No.HP Alternatif : ""
        Email : ""
        
        anggota keluarga
        [
            {
                nama : nama anggota_keluarga
                bin_atau_binti : asdasd
            } ......
        ]

        jumlah_zakat : 0
        jumlah_sodakoh :0
        jumlah_fidyah : 0
        uuid_masjid : ""

        */

    try {
      let pembayarZakat = req.body;

      try {
        await ServiceMasjid.readById(pembayarZakat.uuid_masjid);
      } catch (error) {
        throw new Error("Id masjid tidak di temukan");
      }

      //console.log(`res.body : ${pembayarZakat}`);

      //create family
      let newFamily = {
        nama_kepala_keluarga: pembayarZakat.nama_lengkap,
        tempat_lahir: pembayarZakat.tempat_lahir,
        tanggal_lahir: pembayarZakat.tanggal_lahir,
        alamat: pembayarZakat.alamat,
        kelurahan: pembayarZakat.kelurahan,
        kecamatan: pembayarZakat.kecamatan,
        kota_atau_kabupaten: pembayarZakat.kota_atau_kabupaten,
        no_hp_wa: pembayarZakat.no_hp_wa,
        no_hp_alternatif: pembayarZakat.no_hp_alternatif,
        email: pembayarZakat.email,
      };

      //console.log(`new family : ${newFamily}`);

      let resutNewFamily = await ServiceFamily.createFamily(newFamily);

      //console.log(`resut new family : ${resutNewFamily.uuid}`);

      if (!resutNewFamily) {
        throw new Error("Gagal membuat data family");
      }
      //masukan new family ID baru

      //insert jamaah
      let jumlahJamaah = 0;
      let dataJamaahs = [];

      //console.log(`anggota keluarga : ${pembayarZakat.anggota_keluarga[0].nama}`);
      const headFamilly ={
        uuid_masjid: pembayarZakat.uuid_masjid,
        nama : pembayarZakat.nama_lengkap,
        bin : pembayarZakat.bin,
        binti :pembayarZakat.binti,
        jabatan_di_keluarga :"kepala_keluarga",
        uuid_family : resutNewFamily.uuid
      }

      let newHeadFamily = await ServiceJamaah.createJamaah(headFamilly);
            //console.log(newJamaah);

      dataJamaahs.push(newHeadFamily);
      //kepala keluarga masukin ke jamaah
      
      //

      for (let i = 0; i < pembayarZakat.anggota_keluarga.length; i++) {
        const jamaah = pembayarZakat.anggota_keluarga[i];
        jamaah.uuid_masjid = pembayarZakat.uuid_masjid;
        jamaah.uuid_family = resutNewFamily.uuid;
        try {
          if (jamaah.nama != "") {
            jumlahJamaah++;

            let newJamaah = await ServiceJamaah.createJamaah(jamaah);
            //console.log(newJamaah);

            dataJamaahs.push(newJamaah);
          }
        } catch (error) {
          throw new Error(`gagal input jamaan ${jamaah} error : ${error}`);
        }
      }

      //console.log(`jumlah jamaah ${jumlahJamaah} : ${pembayarZakat.anggota_keluarga.length}`);
      // if(jumlahJamaah != pembayarZakat.anggota_keluarga.length){
      //     throw new Error(`jumlah jamaah yang di input tidak sesuai ${jumlahJamaah} : ${pembayarZakat.anggota_keluarga.length}`)
      // }

      let amoutZakat = parseInt(pembayarZakat.zakat) * jumlahJamaah;
      //insert zakat
      let zakat = {
        uuid_family: resutNewFamily.uuid,
        jumlah_zakat: amoutZakat,
        tim: pembayarZakat.tim,
        tahun: "2024",
      };
      let newZakat = await ServiceZakat.createZakat(zakat);
      
      //insert sodakoh
      if(pembayarZakat.sodakoh === "" || pembayarZakat.sodakoh == null){
        pembayarZakat.sodakoh = 0;
      }
      let sodakoh = {
        uuid_family: resutNewFamily.uuid,
        jumlah_sodakoh: pembayarZakat.sodakoh,
        tahun: "2024",
      };
      let newsodakoh = await ServiceSodakoh.createSodakoh(sodakoh);

      
      //insert fidyah
      if(pembayarZakat.fidyah === "" || pembayarZakat.fidyah == null){
        pembayarZakat.fidyah = 0;
      }
      let fidyah = {
        uuid_family: resutNewFamily.uuid,
        jumlah_fidyah: pembayarZakat.fidyah,
        tahun: "2024",
      };
      let newfidyah = await ServiceFidyah.createFidyah(fidyah);

      //console.log(newsodakoh);
      //throw new Error("tes");
      //

      let resut = {
        keluarga: resutNewFamily,
        anggota_keluarga: dataJamaahs,
        zakat: newZakat,
        fidyah : newfidyah,
        sodakoh: newsodakoh,
      };

      ViewResponse.success(
        res,
        "berhasil menginput data zakat baru",
        resut,
        200
      );
    } catch (error) {
      ViewResponse.fail(res, "gagal menginput data zakat baru", error, gagal);
    }
  }
}

export default ControllerInputZakatV1;
