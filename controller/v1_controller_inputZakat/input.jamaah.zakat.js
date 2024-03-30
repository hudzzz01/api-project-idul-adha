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
  static async inputKususFidyah(req, res) {
    try {
      const dataPemberiFidyah = req.body;
      //buat instace jamaah
      const jamaah = {
        nama: dataPemberiFidyah.nama,
        alamat: dataPemberiFidyah.alamat,
        nomor_telfon: dataPemberiFidyah.nomor_telfon,
        bin: dataPemberiFidyah.bin,
        binti: dataPemberiFidyah.binti,
        jabatan_di_keluarga: dataPemberiFidyah.jabatan_di_keluarga,
        uuid_family: dataPemberiFidyah.uuid_family,
        uuid_masjid: dataPemberiFidyah.uuid_masjid,
      };
      const newJamaahInstace = await ServiceJamaah.createJamaah(jamaah);

      if (!newJamaahInstace) {
        throw new Error("gagal membuat instace jamaah");
      }

      const uuidJamaah = newJamaahInstace.uuid;
      //console.log(dataPemberiFidyah.uuid_family);
      const family = await ServiceFamily.readById(
        dataPemberiFidyah.uuid_family
      );
      //console.log(family);

      if (!family) {
        throw new Error("uuid family tidak di temukan");
      }
      //buat instace fidyah
      const fidyah = {
        jumlah_fidyah: parseInt(dataPemberiFidyah.jumlah_fidyah),
        tahun: "2024",
        uuid_family: dataPemberiFidyah.uuid_family,
        uuid_jamaah: uuidJamaah,
        tim: dataPemberiFidyah.tim,
      };

      const newInsceFidyah = await ServiceFidyah.createFidyah(fidyah);

      if (!newInsceFidyah) {
        throw new Error("gagal membuat instace fidyah");
      }

      ViewResponse.success(
        res,
        "berhasil menambahkan data fidyah ",
        newInsceFidyah,
        200
      );
    } catch (error) {
      console.log(error);
      ViewResponse.fail(res, "gagal menambah data fidyah", error, gagal);
    }
  }

  static async seluruhPembayaranFidyah(req, res) {
    try {
      console.log("Get all fidyah => ");

      let fidyahs = await ServiceFidyah.readAllFidyah();
      let banyakFidyah = fidyahs.length;

      const hasils = [];
      let jumlahSeluruhFidyah;

      for (let i = 0; i < fidyahs.length; i++) {
        const fidyah = fidyahs[i];

        const jamaah = await ServiceJamaah.readById(fidyah.uuid_jamaah);
        jumlahSeluruhFidyah += parseInt(fidyah.jumlah_fidyah);

        const hasil = {
          uuid: fidyah.uuid,
          nama: jamaah.nama,
          jumlahFidyah: fidyah.jumlah_fidyah,
          tim: fidyah.tim,
        };

        hasils.push(hasil);
      }

      

      //dapatkan kesimpulan tim
      let fidyahTim1 = await ServiceFidyah.readByTeam("1");
      let fidyahTim2 = await ServiceFidyah.readByTeam("2");
      let fidyahTim3 = await ServiceFidyah.readByTeam("3");
      let fidyahTim4 = await ServiceFidyah.readByTeam("4");
      let fidyahTim5 = await ServiceFidyah.readByTeam("5");
      let fidyahTim6 = await ServiceFidyah.readByTeam("6");
      let fidyahTim7 = await ServiceFidyah.readByTeam("7");

      let totalFidyahTim1 = 0;
      let totalFidyahTim2 = 0;
      let totalFidyahTim3 = 0;
      let totalFidyahTim4 = 0;
      let totalFidyahTim5 = 0;
      let totalFidyahTim6 = 0;
      let totalFidyahTim7 = 0;

      for (let i = 0; i < fidyahTim1.length; i++) {
        const fidyah = fidyahTim1[i];
        totalFidyahTim1 += parseInt(fidyah.jumlah_fidyah);
      }

      for (let i = 0; i < fidyahTim2.length; i++) {
        const fidyah = fidyahTim2[i];
        totalFidyahTim2 += parseInt(fidyah.jumlah_fidyah);
      }

      for (let i = 0; i < fidyahTim3.length; i++) {
        const fidyah = fidyahTim3[i];
        totalFidyahTim3 += parseInt(fidyah.jumlah_fidyah);
      }

      for (let i = 0; i < fidyahTim4.length; i++) {
        const fidyah = fidyahTim4[i];
        totalFidyahTim4 += parseInt(fidyah.jumlah_fidyah);
      }

      for (let i = 0; i < fidyahTim5.length; i++) {
        const fidyah = fidyahTim5[i];
        totalFidyahTim5 += parseInt(fidyah.jumlah_fidyah);
      }

      for (let i = 0; i < fidyahTim6.length; i++) {
        const fidyah = fidyahTim6[i];
        totalFidyahTim6 += parseInt(fidyah.jumlah_fidyah);
      }

      for (let i = 0; i < fidyahTim7.length; i++) {
        const fidyah = fidyahTim7[i];
        totalFidyahTim7 += parseInt(fidyah.jumlah_fidyah);
      }

      // console.log(totalFidyahTim1);
      // console.log(totalFidyahTim2);
      // console.log(totalFidyahTim3);
      // console.log(totalFidyahTim4);
      // console.log(totalFidyahTim5);
      // console.log(totalFidyahTim6);
      // console.log(totalFidyahTim7);

      let results = {
        banyakFidyah: banyakFidyah,
        data: hasils,
        totalFidyahTim1: totalFidyahTim1,
        totalFidyahTim2: totalFidyahTim2,
        totalFidyahTim3: totalFidyahTim3,
        totalFidyahTim4: totalFidyahTim4,
        totalFidyahTim5: totalFidyahTim5,
        totalFidyahTim6: totalFidyahTim6,
        totalFidyahTim7: totalFidyahTim7,
      };

      // console.log(result);

      // throw new Error("Tes error");

      ViewResponse.success(
        res,
        "berhasil ambil seluruh data zakat yang telah di input",
        results,
        200
      );
    } catch (error) {
      console.log(error);
      ViewResponse.fail(res, "gagal ambil data", error, gagal);
    }
  }

  static async deletePembayaranFidyah(req, res) {
    try {
      console.log("Delete pembayaran Fidyah => ");
      let uuid_fidyah = req.params.uuid;
      console.log(uuid_fidyah);

      const fidyah = await ServiceFidyah.readById(uuid_fidyah);

      const jamaah = await ServiceJamaah.deleteJamaah(fidyah.uuid_jamaah);

      const delfidyah = await ServiceFidyah.deleteFidyah(uuid_fidyah);

      ViewResponse.success(
        res,
        "berhasil menghapus data fidyah beserta family dan anggotanya",
        fidyah,
        200
      );
    } catch (error) {
      console.log(error);
      ViewResponse.fail(res, "gagal menghapus data  fidyah", error, gagal);
    }
  }

  static async kesimpulan(req, res) {
    try {

      //dapatkankesimpulan jumlah cowo cewe
      let cowocewe = await ServiceJamaah.getCowoCewe()
      let cowo = cowocewe.cowo;
      let cewe = cowocewe.cewe;



 


      let jumlahJamaahYangMembayarZakat = 0;
      const zakats = await ServiceZakat.readAllZakat();

      for (let i = 0; i < zakats.length; i++) {
        const zakat = zakats[i];

        jumlahJamaahYangMembayarZakat += (
          await ServiceJamaah.readByFamilyId(zakat.uuid_family)
        ).length;
      }

      const jumlahPembayarFidyah = (await ServiceFidyah.readAllFidyah()).length;
      const jumlahKeluarga = (await ServiceFamily.readAllFamily()).length - 1;
      const jumlahJamah = (await ServiceJamaah.readAllJamaah()).length;
      let jumlahSeluruhZakat = 0;
      let jumlahSeluruhSodakoh = 0;
      let jumlahSeluruhfidyah = 0;
      const fidyah = await ServiceZakat.readAllZakat();
      for (let i = 0; i < fidyah.length; i++) {
        const zakat = fidyah[i];

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

      const jumlahSeluruhnya =
        jumlahSeluruhSodakoh + jumlahSeluruhZakat + jumlahSeluruhfidyah;

      //dapatkan kesimpulan tim ZAKAT !!!!!!
      let fidyahTim1 = await ServiceZakat.readByTeam("1");
      let fidyahTim2 = await ServiceZakat.readByTeam("2");
      let fidyahTim3 = await ServiceZakat.readByTeam("3");
      let fidyahTim4 = await ServiceZakat.readByTeam("4");
      let fidyahTim5 = await ServiceZakat.readByTeam("5");
      let fidyahTim6 = await ServiceZakat.readByTeam("6");
      let fidyahTim7 = await ServiceZakat.readByTeam("7");

      let totalFidyahTim1 = 0;
      let totalFidyahTim2 = 0;
      let totalFidyahTim3 = 0;
      let totalFidyahTim4 = 0;
      let totalFidyahTim5 = 0;
      let totalFidyahTim6 = 0;
      let totalFidyahTim7 = 0;

      for (let i = 0; i < fidyahTim1.length; i++) {
        const fidyah = fidyahTim1[i];
        totalFidyahTim1 += parseInt(fidyah.jumlah_zakat);
      }

      for (let i = 0; i < fidyahTim2.length; i++) {
        const fidyah = fidyahTim2[i];
        totalFidyahTim2 += parseInt(fidyah.jumlah_zakat);
      }

      for (let i = 0; i < fidyahTim3.length; i++) {
        const fidyah = fidyahTim3[i];
        totalFidyahTim3 += parseInt(fidyah.jumlah_zakat);
      }

      for (let i = 0; i < fidyahTim4.length; i++) {
        const fidyah = fidyahTim4[i];
        totalFidyahTim4 += parseInt(fidyah.jumlah_zakat);
      }

      for (let i = 0; i < fidyahTim5.length; i++) {
        const fidyah = fidyahTim5[i];
        totalFidyahTim5 += parseInt(fidyah.jumlah_zakat);
      }

      for (let i = 0; i < fidyahTim6.length; i++) {
        const fidyah = fidyahTim6[i];
        totalFidyahTim6 += parseInt(fidyah.jumlah_zakat);
      }

      for (let i = 0; i < fidyahTim7.length; i++) {
        const fidyah = fidyahTim7[i];
        totalFidyahTim7 += parseInt(fidyah.jumlah_zakat);
      }

      // console.log(totalFidyahTim1);
      // console.log(totalFidyahTim2);
      // console.log(totalFidyahTim3);
      // console.log(totalFidyahTim4);
      // console.log(totalFidyahTim5);
      // console.log(totalFidyahTim6);
      // console.log(totalFidyahTim7);

      const jumlah_seluruh_dana_tim =
        totalFidyahTim1 +
        totalFidyahTim2 +
        totalFidyahTim3 +
        totalFidyahTim4 +
        totalFidyahTim4 +
        totalFidyahTim5 +
        totalFidyahTim6 +
        totalFidyahTim7;

      //console.log(jumlah_seluruh_dana_tim);

      let myData = {
        jumlahCowo : cowo,
        jumlahCewe : cewe,

        jumlahKeluargaYangMembayarZakat: jumlahKeluarga,

        jumlahPembayarZakat: jumlahJamaahYangMembayarZakat,
        jumlahPembayarFidyah: jumlahPembayarFidyah,

        jumlahSeluruhZakat: jumlahSeluruhZakat,
        jumlahSeluruhSodakoh: jumlahSeluruhSodakoh,
        jumlahSeluruhfidyah: jumlahSeluruhfidyah,
        jumlahSeluruhDanaZakatSodakohDanFidyah: jumlahSeluruhnya,
        totalZakatTim1: totalFidyahTim1,
        totalZakatTim2: totalFidyahTim2,
        totalZakatTim3: totalFidyahTim3,
        totalZakatTim4: totalFidyahTim4,
        totalZakatTim5: totalFidyahTim5,
        totalZakatTim6: totalFidyahTim6,
        totalZakatTim7: totalFidyahTim7,
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
      console.log("Delete pembayaran Zakat => ");
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
      console.log("Get all Zakat With Pagination => ");
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
          jumlah_pembayaran_fidyah: jumlah_fidyah,
          total_bayar:
            (await zakat.jumlah_zakat) + jumlah_sodakoh + jumlah_fidyah,
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
      console.log("Get all Zakat => ");
      let results = [];

      let zakats = await ServiceZakat.readAllZakat();
      let banyakZakat = zakats.length;

      for (let i = 0; i < zakats.length; i++) {
        const zakat = zakats[i];
        const family = await ServiceFamily.readById(zakat.uuid_family);
        const jamaahs = await ServiceJamaah.readByFamilyId(zakat.uuid_family);
        const sodakoh = await ServiceSodakoh.readByFamilyId(zakat.uuid_family);
        //const fidyah = await ServiceFidyah.readByFamilyId(zakat.uuid_family);
        //const jumlah_fidyah = fidyah.jumlah_fidyah;
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
          //jumlah_pembayaran_fidyah : jumlah_fidyah,
          total_bayar: (await zakat.jumlah_zakat) + jumlah_sodakoh, //+ jumlah_fidyah,
          banyakKeluarga: await banyakZakat,
          tim: await zakat.tim,
        });
      }
      ViewResponse.success(
        res,
        "berhasil ambil seluruh data zakat yang telah di input",
        results,
        200
      );
    } catch (error) {
      console.log(error);
      ViewResponse.fail(res, "gagal ambil data", error, gagal);
    }
  }

  static async getPembayaranZakatById(req, res) {
    try {
      console.log("Get Zakat => " + req.params.uuid);
      const uuid_zakat = req.params.uuid;

      let zakat = await ServiceZakat.readById(uuid_zakat);
      const family = await ServiceFamily.readById(zakat.uuid_family);
      const jamaahs = await ServiceJamaah.readByFamilyId(zakat.uuid_family);
      const sodakoh = await ServiceSodakoh.readByFamilyId(zakat.uuid_family);
      //const fidyah = await ServiceFidyah.readByFamilyId(zakat.uuid_family);
      //const jumlah_fidyah = fidyah.jumlah_fidyah;
      const jumlah_sodakoh = sodakoh.jumlah_sodakoh;
      //console.log(jumlah_fidyah);

      const results = {
        uuid_zakat: await zakat.uuid,
        id_keluarga: await zakat.uuid_family,
        nama_kepala_keluarga: await family.nama_kepala_keluarga,
        anggota_keluarga: await jamaahs,
        jumlah_anggota_keluarga: await jamaahs.length,
        jumlah_pembayaran_zakat: await zakat.jumlah_zakat,
        jumlah_pembayaran_sodaqoh: jumlah_sodakoh,
        //jumlah_pembayaran_fidyah : jumlah_fidyah,
        total_bayar: (await zakat.jumlah_zakat) + jumlah_sodakoh, //+ jumlah_fidyah,
        tim: await zakat.tim,
      };

      ViewResponse.success(
        res,
        "berhasil ambil data zakat yang telah di input",
        results,
        200
      );
    } catch (error) {
      console.log(error);
      ViewResponse.fail(res, "gagal ambil data", error, gagal);
    }
  }

  static async updatePembayaranZakat(req,res){
    
    try {
      const uuid_zakat = req.params.uuid;
      const data = req.body;
      console.log(data)
      const newFamily = await ServiceFamily.updateFamily(data.id_keluarga,{
        nama_kepala_keluarga:data.nama_kepala_keluarga,
        email:data.email,
        alamat:data.alamat,
        kecamatan:data.kecamatan,
        kelurahan : data.kelurahan,
        kota_atau_kabupaten:data.kota_atau_kabupaten,
        no_hp_wa:data.no_hp_wa,
        no_hp_alternatif : data.no_hp_alternatif,
        tanggal_lahir : data.tanggal_lahir,
        tempat_lahir : data.tempat_lahir,
      })

      let newAnggota = [];
      const jumlahZakat = data.zakat * (data.anggota_keluarga.length + 1);
      const newZakat = await ServiceZakat.updateZakat(uuid_zakat,{jumlah_zakat:jumlahZakat,
        tim:data.tim,uuid_family:data.id_keluarga,tahun:"2024"});
        const newKepalalaKeluarga = await ServiceJamaah.updateJamaah(data.id_kepala_keluarga,{
        alamat : data.alamat,
        tim : data.tim,
        nama : data.nama_lengkap,
        bin : data.bin,
        binti : data.binti,
        jabatan_di_keluarga : "kepala_keluarga",
        uuid_family : data.id_keluarga,
        uuid_masjid : data.uuid_masjid,
        
      })

      

      newAnggota.push(newKepalalaKeluarga);


      for (let i = 0; i < data.anggota_keluarga.length; i++) {
        const jamaah = data.anggota_keluarga[i];
        
        const jamaahBaru = await ServiceJamaah.updateJamaah(jamaah.uuid,{
          alamat : jamaah.alamat,
          tim : data.tim,
          nama : jamaah.nama_lengkap,
          bin : jamaah.bin,
          binti : jamaah.binti,
          jabatan_di_keluarga : jamaah.jabatan_di_keluarga,
          uuid_family : data.id_keluarga,
          uuid_masjid : data.uuid_masjid,
        })

        newAnggota.push(jamaahBaru)
      }
      const sodakoh = await ServiceSodakoh.readByFamilyId(data.id_keluarga);
      const newSodakoh = await ServiceSodakoh.updateSodakoh(sodakoh.uuid,{
        jumlah_sodakoh : data.sodakoh,
        uuid_family:data.id_keluarga,
      })

      console.log(newZakat);
      console.log(newAnggota);
      console.log(newSodakoh);



    } catch (error) {
      console.log(error)      
    }
  }

  static async inputZakatJamaah(req, res) {
    console.log("Post input Zakat => ");
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
      const headFamilly = {
        uuid_masjid: pembayarZakat.uuid_masjid,
        nama: pembayarZakat.nama_lengkap,
        bin: pembayarZakat.bin,
        binti: pembayarZakat.binti,
        jabatan_di_keluarga: "kepala_keluarga",
        uuid_family: resutNewFamily.uuid,
      };

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
          console.log(error);
          throw new Error(`gagal input jamaan ${jamaah} error : ${error}`);
        }
      }

      //console.log(`jumlah jamaah ${jumlahJamaah} : ${pembayarZakat.anggota_keluarga.length}`);
      // if(jumlahJamaah != pembayarZakat.anggota_keluarga.length){
      //     throw new Error(`jumlah jamaah yang di input tidak sesuai ${jumlahJamaah} : ${pembayarZakat.anggota_keluarga.length}`)
      // }

      let amoutZakat = parseInt(pembayarZakat.zakat) * (jumlahJamaah + 1);
      //insert zakat
      console.log(pembayarZakat.tim);
      let zakat = {
        uuid_family: resutNewFamily.uuid,
        jumlah_zakat: amoutZakat,
        tim: pembayarZakat.tim,
        tahun: "2024",
      };
      let newZakat = await ServiceZakat.createZakat(zakat);

      //insert sodakoh
      if (pembayarZakat.sodakoh === "" || pembayarZakat.sodakoh == null) {
        pembayarZakat.sodakoh = 0;
      }
      let sodakoh = {
        uuid_family: resutNewFamily.uuid,
        jumlah_sodakoh: pembayarZakat.sodakoh,
        tahun: "2024",
      };
      let newsodakoh = await ServiceSodakoh.createSodakoh(sodakoh);

      // //insert fidyah
      // if(pembayarZakat.fidyah === "" || pembayarZakat.fidyah == null){
      //   pembayarZakat.fidyah = 0;
      // }
      // let fidyah = {
      //   uuid_family: resutNewFamily.uuid,
      //   jumlah_fidyah: pembayarZakat.fidyah,
      //   tahun: "2024",
      // };
      // let newfidyah = await ServiceFidyah.createFidyah(fidyah);

      //console.log(newsodakoh);
      //throw new Error("tes");
      //

      let resut = {
        keluarga: resutNewFamily,
        anggota_keluarga: dataJamaahs,
        zakat: newZakat,
        //fidyah : /*newfidyah*/ {jumlah_fidyah:0},
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
