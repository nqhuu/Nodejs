require('dotenv').config();
// thư viện gửi mail nodemailer
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    console.log('dataSend', dataSend)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"HPG-support 👻" <${process.env.EMAIL_APP}>`, // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Xác nhận đặt lịch khám bệnh", // Subject line
        // text: "Hello world?", // plain text body
        html:
            `
            <h3>Xin chào: ${dataSend.patientName}</h3>
            <p>Đây là email tự động được gửi từ HPG support.</p>
            <p>Thông tin đặt lịch khám bệnh tại hpgsupport.com.vn</p>
            <div>Thời gian: </div>
            <div><a href="${dataSend.redirectLink}">Click here</a></div>
            `, // html body
    });
}

module.exports = {
    sendSimpleEmail
}