import { google } from 'googleapis';
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


    static async sendGmail(email,pesan){
        const oauth2Client = new google.auth.OAuth2(
            'your-client-id', // Ganti dengan client ID Anda
            'your-client-secret', // Ganti dengan client secret Anda
            'https://developers.google.com/oauthplayground' // Ganti dengan redirect URI yang diizinkan
        );

        // Mendapatkan URL autorisasi untuk mendapatkan refreshToken
        const authorizeUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/gmail.send',
        });

        console.log(`Buka URL ini untuk mendapatkan refreshToken:\n${authorizeUrl}`);

        // Izinkan pengguna membuka URL dan mengizinkan aplikasi
        // Setelah itu, masukkan refreshToken di bawah ini

        const refreshToken = '1//04uxeLKpsCD9sCgYIARAAGAQSNwF-L9Ir7YlwXVwOuYgPkz7rc9a4wgIpL6VmSWLhfIS9d8DOd9RfL_wehuyKliepuFD_6rFQ7QI'; // Ganti dengan refreshToken yang diberikan pengguna

            oauth2Client.setCredentials({
                refresh_token: refreshToken,
            });

            const accessToken = "ya29.a0AfB_byCwUDhhytcbTMO_2o9Inae1xs6tzdi5zjbV5flZeuNcHT-V0U6t5oxMQ2PwQfIANLyBBOlcEowUkCR7nKgowikj5O2Uu850YVzcMjTS76M5S6cC0-lY-FBfClwg4P29l60e3gwup8vgJ3Uii2HG6WZHO2GfX62eaCgYKAQQSARASFQHGX2MiyGnycUX1j_pW5x3S64nXdw0171"//await oauth2Client.getAccessToken();

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                type: 'OAuth2',
                user: 'mirajmetrics@gmail.com', // Ganti dengan alamat Gmail Anda
                clientId: '496404851916-5jfkbbmflk165cm26incke40cf5rkvi6.apps.googleusercontent.com', // Ganti dengan client ID Anda
                clientSecret: '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', // Ganti dengan client secret Anda
                refreshToken: refreshToken,
                accessToken: accessToken,
                },
            });

            const mailOptions = {
                from: 'mirajmetrics@gmail.com', // Ganti dengan alamat Gmail Anda
                to: email,
                subject: 'OTP untuk Reset Kata Sandi via gmail',
                text: pesan,
            };

            const data = await transporter.sendMail(mailOptions);

            return data
    }

    // EmailService.sendGmail('recipient@example.com', 'Ini adalah pesan uji.').then(response => {
    // console.log('Email sent:', response);
    // }).catch(error => {
    // console.error('Error sending email:', error);
    // });



}

export default SendMail;