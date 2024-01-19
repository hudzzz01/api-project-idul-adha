import nodemailer from 'nodemailer';

class SendMail{
    static async send(email,pesan){

        try {
            
        } catch (error) {
            
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 465,
            service:'Yahoo',
            secure: false,
            auth:{
                user: 'willymotor@yahoo.com',
                pass: 'pnkyawznaeaktvkm'
            },
            logger: true
        })

        const mailOptions = {
            from: 'willymotor@yahoo.com',
            to: email,
            subject: 'OTP untuk Reset Kata Sandi',
            text: pesan,
        }

        const data = await transporter.sendMail(mailOptions);
        
        return data;
    }
}

export default SendMail;