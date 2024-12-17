import { where } from "sequelize";
import db from "../models";
import { defaultTo } from "lodash";
import emailService from './emailService'
require('dotenv').config();
import moment from 'moment'; // format date
import localization from 'moment/locale/vi'; // moment sẽ format date theo tiếng việt
import { name } from "ejs";
// muốn chuyển lại tiếng anh thì cần sử dụng locale('en') : moment(new Date()).locale('en').format("ddd" - DD/MM)



let createSpecialtyService = async (data) => {
    if (!data) {
        return ({
            errCode: 1,
            errMessage: 'Error from server postVerifyBookAppointmentService'
        })
    } else {
        let [response, status] = await db.Specialty.findOrCreate({
            where: {
                name: data.nameSpecialty
            },
            defaults: {
                name: data.nameSpecialty,
                image: data.imageBase64,
                descriptionMarkdown: data.descriptionMarkdown,
                descriptionHTML: data.descriptionHTML
            }
        })

        // console.log(response, status)
        return ({
            errCode: 0,
            errMessage: "Tạo Chuyên khoa thành công",
            status: status
        })

    }
}

let getAllSpecialtyService = async (limit) => {
    try {
        let specialty = await db.Specialty.findAll({
            limit: limit,
        })

        return ({
            errCode: 0,
            data: specialty
        })
    } catch (e) {
        reject(e);
    }
}

module.exports = {
    createSpecialtyService: createSpecialtyService,
    getAllSpecialtyService: getAllSpecialtyService,
}