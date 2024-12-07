import { where } from "sequelize";
import db from "../models";
import { defaultTo } from "lodash";
import emailService from './emailService'
require('dotenv').config();


let postBookAppointment = async (data) => {
    console.log(data)
    try {
        if (!data.email || !data.doctorId || !data.timeType || !data.date) {
            return ({
                errCode: 1,
                errMessage: 'Error from server postBookAppointment service'
            })

        } else {

            // let doctor = await db.User.findOne({
            //     where: { id: data.doctorId },
            //     attributes: {
            //         exclude: ['password'] // không lấy trường password
            //     },
            //     include: [
            //         {
            //             model: db.Allcode,
            //             as: 'doctorData',
            //             attributes: ['valueEn', 'valueVi'],
            //         }
            //     ]
            // })

            // console.log('doctor', doctor)

            await emailService.sendSimpleEmail({ // hàm gửi mail tự động
                reciverEmail: data.email,
                redirectLink: "https://kinhhongphuc.vn/",
                patientName: data.fullName,
                phoneNumber: data.phoneNumber,
                address: data.address,
                reason: data.reason,
                date: data.date,
                doctorName: 'doctor',
                time: data.timeType,
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