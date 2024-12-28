require('dotenv').config();
// thư viện gửi mail nodemailer
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    // console.log('dataSend', dataSend)
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
            <p>Đây là email tự động được gửi từ HPG-Support.</p>
            <p>Thông tin đặt lịch khám bệnh tại hpgsupport.com.vn</p>
            <p>Quý khách vui lòng kiểm tra lại thông tin, nếu chính xác thì xác nhận đặt lịch bằng cách click vào đường link bên dưới</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>${dataSend.doctorData}: ${dataSend.fullNameDoctor}</b></div>   
            <div><a href="${dataSend.redirectLink}" target="_blank">Click here</a></div>
            <p>Rấ hân hạnh được phục vụ quý khách !</p>
            `, // html body
    });
}

module.exports = {
    sendSimpleEmail
}