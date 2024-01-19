import speakeasy from 'speakeasy';


class OTP {
    static async createOTP(email) {
        // Mendapatkan OTP yang berubah setiap 30 detik (default interval)
        console.log(email);
        const kunci = email
        const otp = speakeasy.totp({
          secret: kunci,
          step:1800,
        });
    
        // console.log('Secret Key:', kunci);
         console.log('OTP:', otp);
         console.log(typeof (otp));
        return otp
    }

  static async verifOTP(email,otp) {
    console.log(otp)
    console.log(typeof(otp));
    console.log(email);
    const kunci = email;
    // Memverifikasi OTP
    const isValid = await speakeasy.totp.verify({
      secret: kunci,
      step:1800,
      token: otp,
    });

    console.log(isValid);

    return isValid
  }
}

export default OTP;
