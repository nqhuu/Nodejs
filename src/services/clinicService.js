import { where } from "sequelize";
import db from "../models";
import { defaultTo, includes, _ } from "lodash";
import emailService from './emailService'
require('dotenv').config();
import moment from 'moment'; // format date
import localization from 'moment/locale/vi'; // moment sẽ format date theo tiếng việt
import { name } from "ejs";
// muốn chuyển lại tiếng anh thì cần sử dụng locale('en') : moment(new Date()).locale('en').format("ddd" - DD/MM)



let createClinicService = async (data) => {
    console.log(data)
    if (!data) {
        return ({
            errCode: 1,
            errMessage: 'Error from server postVerifyBookAppointmentService'
        })
    } else {
        let [response, status] = await db.Clinic.findOrCreate({
            where: {
                name: data.nameClinic,
            },
            defaults: {
                name: data.nameClinic,
                image: data.imageBase64,
                descriptionMarkdown: data.descriptionMarkdown,
                descriptionHTML: data.descriptionHTML,
                address: data.address,
            }
        })
        return ({
            errCode: 0,
            errMessage: "Tạo phòng khám thành công",
            status: status
        })

    }
}


module.exports = {
    createClinicService: createClinicService,
}