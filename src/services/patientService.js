import { where } from "sequelize";
import db from "../models";
import { defaultTo } from "lodash";
import emailService from './emailService'
require('dotenv').config();
import moment from 'moment'; // format date
import localization from 'moment/locale/vi'; // moment sẽ format date theo tiếng việt
// muốn chuyển lại tiếng anh thì cần sử dụng locale('en') : moment(new Date()).locale('en').format("ddd" - DD/MM)


let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}


let postBookAppointment = async (data) => {

    let dateBooking = capitalizeFirstLetter(moment(data.date).format('dddd - DD/MM/YYYY'))

    try {
        if (!data.email || !data.doctorId || !data.timeType || !data.dateBirthDay || !data.dateBooking) {
            return ({
                errCode: 1,
                errMessage: 'Error from server postBookAppointment service'
            })

        } else {
            await emailService.sendSimpleEmail({ // hàm gửi mail tự động
                reciverEmail: data.email,
                redirectLink: process.env.REDIRECT_LINK,
                patientName: data.fullName,
                phoneNumber: data.phoneNumber,
                address: data.address,
                reason: data.reason,
                dateBooking: dateBooking,
                dateBirthDay: data.dateBirthDay,
                doctorData: data.doctorData.valueVi,
                fullNameDoctor: data.fullNameDoctor,
                time: data.time.valueVi,
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
                        date: data.date,
                        timeType: data.timeType,
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

module.exports = {
    postBookAppointment: postBookAppointment
}