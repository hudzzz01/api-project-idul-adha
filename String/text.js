class Text {
    static textOtp(namaPengguna, otp) {
        let pesan = `Kepada ${namaPengguna},

Halo ${namaPengguna},

Kami berharap Anda dalam keadaan sehat dan baik-baik saja. Kami mendapatkan informasi bahwa Anda mengalami kesulitan dalam mengakses akun Anda karena lupa kata sandi. Untuk membantu Anda mengatasi masalah ini, kami telah menyediakan One-Time Password (OTP) untuk proses reset kata sandi.

Berikut adalah OTP Anda: ${otp}
OTP ini berlaku selama 20 menit 

apifronend.com/lupapasword?=${otp}

Mohon untuk tidak membagikan OTP ini kepada siapapun, termasuk pihak yang mengaku dari dukungan pelanggan. Kami hanya akan meminta Anda memasukkan OTP ini secara aman pada halaman reset kata sandi.

Jika Anda tidak meminta reset kata sandi atau merasa ini adalah kegiatan mencurigakan, segera hubungi tim dukungan kami. Kami akan dengan segera membantu Anda.

Terima kasih atas kerja sama Anda.

Hormat kami,
Mirajmetrics
mirajmetrics@gmail.com
wa.me/0856-2200-973
https://i.imgur.com/566ri7N.png`;
        return pesan;
    }
}

export default Text;