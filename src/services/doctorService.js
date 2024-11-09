import { cast, where } from "sequelize"
import db from "../models/index"
import { raw } from "body-parser"
import allcode from "../models/allcode"

let getTopDoctorHomeService = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: {
                    positionId: 'P0'
                },
                orderL: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password',]
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);
        }
    })
}


let getAllDoctorService = async () => {
    try {
        let users = await db.User.findAll({
            where: {
                roleId: 'R2'
            },
            attributes: {
                exclude: ['password', 'image']
            },
            raw: true,
        })
        return ({
            errCode: 0,
            data: users
        })
    } catch (e) {
        console.log(e)
    }
}

let saveDetailInforDoctor = async (data) => {
    // console.log('saveDetailInforDoctor', data)
    try {
        if (!data.hasOldData && data.doctorId && data.contentHTML && data.contentMarkdown && data.description) {
            await db.Markdown.create({
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
                description: data.description,
                doctorId: data.doctorId,
                specialtyId: data.specialtyId,
                clinicId: data.clinicId
            })
            return ({
                errCode: 0,
                errMessage: 'Bổ sung thông tin thành công'
            })
        }
        if (data.hasOldData && data.doctorId && data.contentHTML && data.contentMarkdown && data.description) {
            let doctor = await db.Markdown.findOne({
                where: {
                    doctorId: data.doctorId,
                },
                raw: false // phải để raw là false thì mới đưa dữ liệu về kiểu object của sequelize thay vì object thông thường
            })
            if (doctor) {
                // console.log('Instance of Model:', doctor instanceof db.Markdown); // Kiểm tra xem doctor có phải instance không
                doctor.contentHTML = data.contentHTML;
                doctor.contentMarkdown = data.contentMarkdown;
                doctor.description = data.description;
                // doctor.specialtyId = data.specialtyId;
                // doctor.clinicId = data.clinicId;
                await doctor.save();
                return ({
                    errCode: 1,
                    errMessage: 'Cập nhật thành công'
                })
            }
        }
    } catch (e) {
        console.log('catch', e)
        return ({
            errCode: 2,
            errMessage: 'lỗi phía server Error from server'
        })
    }
}


let getAllInforDoctorService = async () => {
    try {
        let doctor = await db.Markdown.findAll()
        return ({
            errCode: 0,
            data: doctor
        })
    } catch (e) {
        return ({
            errCode: 1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailDoctorByIdService = async (id) => {
    try {
        if (!id) {
            return ({
                errCode: 2,
                errMessage: 'Error from server: getDetailDoctorByIdService : id'
            })
        } else {

            // console.log('getDetailDoctorByIdService', id)
            let data = await db.User.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['password', 'image']
                },
                include: [
                    {
                        model: db.Markdown, attributes: {
                            exclude: ['specialtyId', 'clinicId', 'createdAt', 'updatedAt']
                        }
                    },
                    { model: db.Allcode, as: 'doctorData' }
                ],
                raw: true,
                nest: true,
            })
            // if (data.image) {
            //     data.image = Buffer(data.image, 'base64').toString('binary'); // chuyển đổi hình ảnh mã hóa từ base64 sang binary
            // }
            // console.log('getDetailDoctorByIdService', data)
            return ({
                errCode: 0,
                data: data
            })
        }
    } catch (e) {
        return ({
            errCode: 1,
            errMessage: 'Error from server: getDetailDoctorByIdService'
        })
    }
}

module.exports = {
    getTopDoctorHomeService: getTopDoctorHomeService,
    getAllDoctorService: getAllDoctorService,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getAllInforDoctorService: getAllInforDoctorService,
    getDetailDoctorByIdService: getDetailDoctorByIdService,
}