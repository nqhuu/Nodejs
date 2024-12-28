import { where } from "sequelize";
import db from "../models";
import { defaultTo, includes, _ } from "lodash";
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


let getDetailSpecialtyById = async (id, location) => {
    try {
        let specialtyAndDotor = {};
        // let queryOptions = {
        //     where: { id: id },
        //     attributes: ['descriptionMarkdown', 'descriptionHTML'],
        //     include: [
        //         {
        //             model: db.doctor_infor,
        //             attributes: ['doctorId', 'provinceId'],
        //             as: 'specialtyData',
        //             ...(location !== 'ALL' && { where: { provinceId: location } }), // Điều kiện động cho where, nếu location khác "ALL" sử dụng where
        //             required: true, // Đảm bảo lấy tất cả các bản ghi liên quan
        //         },
        //     ],
        //     raw: true,
        //     nest: true
        // };

        let specialty = await db.Specialty.findOne({
            where: { id: id },
            attributes: ['descriptionMarkdown', 'descriptionHTML'],
        })

        let doctorInSpecialty = {};
        if (_.isEmpty(specialty)) {
            return ({
                errCode: 2,
                errMessage: 'Không tồn tại chuyên khoa',
            })
        } else {
            doctorInSpecialty = await db.doctor_infor.findAll({
                where: {
                    specialtyId: id,
                    ...(location !== 'ALL' && { provinceId: location }),
                },
                attributes: ['doctorId', 'provinceId'],
                as: 'specialtyData',
            })
        }


        if (specialty && doctorInSpecialty && !_.isEmpty(specialty)) {
            specialtyAndDotor.specialty = specialty;
            specialtyAndDotor.doctorInSpecialty = doctorInSpecialty;
        }

        return ({
            errCode: 0,
            errMessage: 'ok',
            data: specialtyAndDotor
        })

    } catch (e) {
        console.log(e)
        return ({
            errCode: 2,
            errMessage: 'Error from server: getDetailSpecialtyById service'
        })
    }
}

module.exports = {
    createSpecialtyService: createSpecialtyService,
    getAllSpecialtyService: getAllSpecialtyService,
    getDetailSpecialtyById: getDetailSpecialtyById,
}