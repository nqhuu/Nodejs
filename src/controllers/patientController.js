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

module.exports = {
    postBookAppointment: postBookAppointment,
}