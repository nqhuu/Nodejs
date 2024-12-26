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



let getAllClinicService = async (limit) => {
    try {
        let specialty = await db.Clinic.findAll({
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

let getDetailClinicById = async (id) => {
    try {
        let ClinicById = {};
        let doctorInClinic = {};
        let doctorAndClinic = {}
        ClinicById = await db.Clinic.findOne({
            where: { id: id },
            // attributes: ['descriptionMarkdown', 'descriptionHTML'],
        })

        if (_.isEmpty(ClinicById)) {
            return ({
                errCode: 2,
                errMessage: 'Không tồn tại chuyên khoa',
            })
        } else {
            doctorInClinic = await db.doctor_infor.findAll({
                where: {
                    clinicId: id,
                    // ...(location !== 'ALL' && { provinceId: location }),
                },
                attributes: ['doctorId'],
                // as: 'ClinicData',
            })
        }


        if (ClinicById && doctorInClinic && !_.isEmpty(ClinicById)) {
            doctorAndClinic.clinic = ClinicById;
            doctorAndClinic.doctorInClinic = doctorInClinic;
        }

        return ({
            errCode: 0,
            errMessage: 'ok',
            data: doctorAndClinic
        })

    } catch (e) {
        console.log(e)
        return ({
            errCode: 2,
            errMessage: 'Error from server: getDetailClinicById service'
        })
    }
}

module.exports = {
    createClinicService: createClinicService,
    getAllClinicService: getAllClinicService,
    getDetailClinicById: getDetailClinicById
}