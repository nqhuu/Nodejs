import { response } from "express"
import patientService from "../services/patientService"
import db from "../models"

let postBookAppointment = async (req, res) => {
    try {
        if (!req.body || !req.body.email) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Error from server postBookAppointment controller'
            })
        } else {
            let response = await patientService.postBookAppointment(req.body)
            return res.status(200).json(response)
        }

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errcode: -1,
            errMessage: 'Error from server postBookAppointment controller'
        })
    }
}

let postVerifyBookAppointment = async (req, res) => {
    // console.log(req.query)
    try {
        if (!req.query || !req.query.doctorId || !req.query.token) {
            // if (req.query.token) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Error from server postVerifyBookAppointment controller doctorId token'
            })
        } else {
            let response = await patientService.postVerifyBookAppointmentService(req.query)
            console.log(response)
            return res.status(200).json(response)
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errcode: -1,
            errMessage: 'Error from server postVerifyBookAppointment controller catch'
        })
    }
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}