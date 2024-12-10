import { where } from "sequelize";
import db from "../models";
import { defaultTo } from "lodash";
import emailService from './emailService'
require('dotenv').config();
import moment from 'moment'; // format date
import localization from 'moment/locale/vi'; // moment sẽ format date theo tiếng việt
// muốn chuyển lại tiếng anh thì cần sử dụng locale('en') : moment(new Date()).locale('en').format("ddd" - DD/MM)

// tạo token với thư viện uuid
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.REDIRECT_LINK}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}

let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}


let postBookAppointment = async (data) => {

    let dateBooking = capitalizeFirstLetter(moment(data.date).format('dddd - DD/MM/YYYY'))
    // console.log(data)

    try {
        if (!data.email || !data.doctorId || !data.timeType || !data.dateBirthDay || !data.dateBooking) {
            return ({
                errCode: 1,
                errMessage: 'Error from server postBookAppointment service'
            })

        } else {
            let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
            await emailService.sendSimpleEmail({ // hàm gửi mail tự động
                reciverEmail: data.email,
                redirectLink: buildUrlEmail(data.doctorId, token),
                patientName: data.fullName,
                phoneNumber: data.phoneNumber,
                address: data.address,
                reason: data.reason,
                dateBooking: dateBooking,
                dateBirthDay: data.dateBirthDay,
                doctorData: data.doctorData.valueVi,
                fullNameDoctor: data.fullNameDoctor,
                time: data.timeString
                // schedule: data.
            })


            let user = await db.User.findOrCreate({
                where: {
                    email: data.email
                },
                defaults: {
                    email: data.email,
                    roleId: 'R3'
                }
            })

            // console.log(' data user[0]', user[0])
            if (user && user[0]) {
                await db.Booking.findOrCreate({
                    where: { patientId: user[0].id },
                    defaults: {
                        statusId: 'S1',
                        doctorId: data.doctorId,
                        patientId: user[0].id,
                        date: data.dateBooking,
                        timeType: data.timeType,
                        token: token
                    }
                })
            }
            // console.log('user', user)

            return ({
                errCode: 0,
                errMessage: 'Đã tạo lich hẹn thành công, chờ xác nhận từ bác sĩ'
            })
        }
    } catch (e) {
        console.log(e);

    }
}

let postVerifyBookAppointmentService = async (data) => {
    // console.log(data.doctorId)
    // console.log(data.token)

    if (!data.doctorId || !data.token) {
        return ({
            errCode: 1,
            errMessage: 'Error from server postVerifyBookAppointmentService'
        })
    } else {
        let appointment = await db.Booking.findOne({
            where: {
                doctorId: data.doctorId,
                token: data.token,
                statusId: 'S1'
            },
            raw: false // bắt buộc phải lấy dữ liệu theo kiểu obj của sequelize thì mới thực hiện được thao tác update
        })
        if (appointment) {
            appointment.statusId = 'S2';
            // await appointment.save();
            await appointment.save();
            return ({
                arrCode: 0,
                errMessage: 'Đăng ký lịch thành công'
            })
        } else {
            return ({
                arrCode: 2,
                errMessage: 'bạn đã đăng ký trước đó hoặc mã này không tồn tại'
            })
        }
    }
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointmentService: postVerifyBookAppointmentService
}