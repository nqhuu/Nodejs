import { where } from "sequelize";
import db from "../models";
import { defaultTo } from "lodash";
require('dotenv').config();


let postBookAppointment = async (data) => {
    try {
        console.log('postBookAppointment service', data)
        if (!data.email || !data.doctorId || !data.timeType || !data.date) {
            return ({
                errCode: 1,
                errMessage: 'Error from server postBookAppointment service'
            })

        } else {
            let user = await db.User.findOrCreate({
                where: {
                    email: data.email
                },
                defaults: {
                    email: data.email,
                    roleId: 'R3'
                }
            })

            console.log(' data user[0]', user[0])
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

            return ({
                errCode: 0,
                errMessage: 'access'
            })
        }


    } catch (e) {
        console.log(e);

    }
}

module.exports = {
    postBookAppointment: postBookAppointment
}