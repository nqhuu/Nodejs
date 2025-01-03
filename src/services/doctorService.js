import { cast, where } from "sequelize"
import db from "../models/index"
import { raw } from "body-parser"
import allcode from "../models/allcode"
require('dotenv').config();
import _, { includes } from 'lodash'
import emailService from './emailService'



const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHomeService = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: {
                    roleId: 'R2'
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


// CREATE - UPDATE DOCTOR DETAIL
let saveDetailInforDoctor = async (data) => {
    try {
        if (data.doctorId) {
            let doctor = await db.Markdown.findOne({
                where: {
                    doctorId: data.doctorId,
                },
                raw: false // phải để raw là false thì mới đưa dữ liệu về kiểu object của sequelize thay vì object thông thường
            })

            if (doctor) {
                doctor.contentHTML = data.contentHTML;
                doctor.contentMarkdown = data.contentMarkdown;
                doctor.description = data.description;
                await doctor.save();
            } else {
                await db.Markdown.create({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    doctorId: data.doctorId,
                    specialtyId: data.specialtyId,

                });
            }

            // };


            //gọi và kiểm tra xem có dữ liệu finOne với ID đó không
            let doctorInfor = await db.doctor_infor.findOne({
                where: {
                    doctorId: data.doctorId,
                },
                raw: false // Để raw là false để đối tượng trả về là một instance của Sequelize Model // phải để raw là false thì mới đưa dữ liệu về kiểu object của sequelize thay vì object thông thường
            })

            if (doctorInfor) {
                doctorInfor.doctorId = data.doctorId;
                doctorInfor.priceId = data.selectPrice;
                doctorInfor.provinceId = data.selectProvince;
                doctorInfor.paymentId = data.selectPayment;
                doctorInfor.nameClinic = data.nameClinic;
                doctorInfor.addressClinic = data.addressClinic;
                doctorInfor.note = data.note;
                doctorInfor.historyText = data.historyText;
                doctorInfor.specialtyId = data.specialtyId;
                doctorInfor.clinicId = data.clinicId;
                await doctorInfor.save();
            } else {
                await db.doctor_infor.create({
                    doctorId: data.doctorId,
                    priceId: data.selectPrice,
                    provinceId: data.selectProvince,
                    paymentId: data.selectPayment,
                    nameClinic: data.nameClinic,
                    addressClinic: data.addressClinic,
                    specialtyId: data.specialtyId,
                    clinicId: data.clinicId,
                    note: data.note,
                    historyText: data.historyText,
                });
            };
        };
        return ({
            errCode: 0,
            errMessage: 'Lưu thông tin thành công'
        })
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
                    exclude: ['password'] // không lấy trường password
                },
                include: [ //inclue để kêt hợp các bảng có quan hệ với bảng User

                    //bảng Markdown có quan hệ với bảng User
                    {
                        model: db.Markdown,
                        attributes: {
                            // exclude: ['specialtyId', 'clinicId', 'createdAt', 'updatedAt']
                        }
                    },

                    //bảng Allcode có quan hệ với bảng User
                    {
                        model: db.Allcode,
                        as: 'doctorData',
                        attributes: ['valueEn', 'valueVi'],
                    },
                    {
                        model: db.doctor_infor,
                        attributes: {
                            exclude: ['id', 'doctorId'] // trường không lấy
                        },
                        as: 'doctorInfor',
                        include: [
                            { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                        ]
                    },
                ],
                raw: true,
                nest: true,
            })
            if (data.image) {
                data.image = Buffer(data.image, 'base64').toString('binary'); // chuyển đổi hình ảnh mã hóa từ base64 sang binary
            }
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

let bulkCreateSchedule = async (data) => {
    let dataFormatdate = data.formatDate.toString()
    // console.log('dataFormatdate', typeof dataFormatdate)
    try {
        if (!data && data.length !== 3) {
            return ({
                errCode: 2,
                errMessage: 'Error from server : !data'
            })
        } else {
            let dataSchedule = data.saveSchedule.map((item, index) => ({ ...item, maxNumber: MAX_NUMBER_SCHEDULE })) // thêm thuộc tính maxNumber cho mối obj của array data
            if (dataSchedule, dataSchedule.length > 0) {
                dataSchedule = dataSchedule.map((item, index) => ({ ...item, date: item.date.toString() }))
            }
            // console.log('dataSchedule', dataSchedule)

            let dbSchedule = await db.Schedule.findAll({
                where: {
                    doctorId: data.doctorId,
                    date: dataFormatdate,
                },

                attributes: ['timeType', 'date', 'doctorId', 'maxNumber']
                // attributes: {
                //     exclude: ['createdAt', 'updatedAt'] // không lấy trường ''
                // },
            })
            if (!dbSchedule) dbSchedule = [];

            // a đại diện cho từng phần tử của dataSchedule, b tương tự với dbSchedule, _.differenceWith của lodash trả về phần tử của mảng 1 không trùng với phần tử nào của mảng 2
            let dataScheduleToDb = _.differenceWith(dataSchedule, dbSchedule, (a, b) => a.timeType === b.timeType && a.date === b.date)

            // console.log('dataScheduleToDb', dataScheduleToDb)
            await db.Schedule.bulkCreate(dataScheduleToDb); // create nhiều dòng data bằng bulkCreate sequelize

            return ({
                errCode: 0,
                errMessage: 'Tạo lịch thành công'
            })
        }
    } catch (error) {
        console.log(error);
        return ({
            errCode: 1,
            errMessage: 'Error from server: bulkCreateSchedule'
        })
    }
}

let getScheduleDoctorById = async (doctorId, date) => {
    try {
        let scheduleDoctor = await db.Schedule.findAll({
            where: {
                doctorId: doctorId,
                date: date
            },
            include: [
                { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] }
            ],
            raw: false,
            nest: true
            // include: [ //inclue để kêt hợp các bảng có quan hệ với bảng User
            //     { model: db.Allcode, as: 'timeTypeData' } //bảng Allcode có quan hệ với bảng User
            // ],
        })
        return ({
            errCode: 0,
            data: scheduleDoctor
        })
    } catch (e) {
        console.log(e);
    }
}

let getProfileDoctorById = async (doctorId) => {
    try {
        let doctorInfor = await db.doctor_infor.findOne({
            where: {
                doctorId: doctorId,
            },
            include: [
                { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },

            ],
            raw: true,
            nest: true
        })
        return ({
            errCode: 0,
            data: doctorInfor
        })

    } catch (e) {
        console.log(e);
    }
}

let getListPatientForDoctor = async (doctorId, date) => {
    try {
        let doctorInfor = await db.Booking.findAll({
            where: {
                doctorId: doctorId,
                date: date,
                // ...(patientId && { patientId: patientId }),
                statusId: 'S2'
            },
            include: [

                {
                    model: db.Allcode,
                    as: 'timeTypePatient',
                    attributes: ['valueEn', 'valueVi']
                },
                {
                    model: db.User,
                    as: 'bookingData',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'image'] // không lấy trường ''
                    },
                    include: [
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                    ]

                },
            ],
            raw: true,
            nest: true
        })
        // console.log('doctorInfor', doctorInfor)
        return ({
            errCode: 0,
            data: doctorInfor
        })

    } catch (e) {
        console.log(e);
    }
}


let sendRemedy = async (data) => {
    try {
        if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.patientId
            || !data.base64
        ) {
            return ({
                errCode: 1,
                errMessage: 'Error from server sendRemedy service'
            })
        }
        else {
            let user = await db.Booking.findOne({
                where: {
                    doctorId: data.doctorId,
                    patientId: data.patientId,
                    date: data.date,
                    timeType: data.timeType,
                    statusId: data.statusId
                },
                raw: false
            })

            if (user) {
                user.statusId = 'S3'
                await user.save();
            }
            await emailService.sendRemedyEmail(data) // hàm gửi mail tự động

            return ({
                errCode: 0,
                errMessage: 'Gửi email thành công'
            })
        }
    } catch (e) {
        console.log(e);

    }
}



module.exports = {
    getTopDoctorHomeService: getTopDoctorHomeService,
    getAllDoctorService: getAllDoctorService,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getAllInforDoctorService: getAllInforDoctorService,
    getDetailDoctorByIdService: getDetailDoctorByIdService,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorById: getScheduleDoctorById,
    // getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy
}