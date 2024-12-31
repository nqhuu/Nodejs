import doctorService from "../services/doctorService"


let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHomeService(+limit)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'error from server'
        })
    }
}



let getAllDoctor = async (req, res) => {
    try {
        let AllDr = await doctorService.getAllDoctorService()
        return res.status(200).json(AllDr)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'error from server'
        })
    }
}



let postInforDoctor = async (req, res) => {
    try {
        if (req.body) {
            let response = await doctorService.saveDetailInforDoctor(req.body);
            // console.log('postInforDoctor', response)
            return res.status(200).json(response)
        } else {
            return res.status(200).json({
                errCode: -1,
                errMessage: 'error from server'
            })
        }
    } catch (e) {
        console.log('error from server', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {

        if (req.query.id) {
            let response = await doctorService.getDetailDoctorByIdService(req.query.id)
            // console.log('getDetailDoctorById doctorController', response)
            return res.status(200).json(response)
        }
    } catch (e) {
        console.log('getDetailDoctorById ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server: getDetailDoctorById'
        })
    }
}


let bulkCreateSchedule = async (req, res) => {
    try {
        // console.log(req.body)
        let response = await doctorService.bulkCreateSchedule(req.body)
        if (response && response.errCode === 0) {
            return res.status(200).json(response)
        }
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errcode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getScheduleDoctorById = async (req, res) => {
    // console.log('getScheduleDoctorById db', req.query.doctorId, req.query.date)
    try {
        if (!req.query.doctorId || !req.query.date) {
            return res.status(200).json({
                errcode: 1,
                errMessage: 'Error from server'
            })
        } else {
            let response = await doctorService.getScheduleDoctorById(req.query.doctorId, req.query.date)
            if (response && response.errCode === 0) {
                return res.status(200).json(response)
            }
        }

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errcode: -1,
            errMessage: 'Error from server'
        })
    }
}


let getProfileDoctorById = async (req, res) => {
    try {
        if (!req.query) {
            return res.status(200).json({
                errcode: 1,
                errMessage: 'Error from server'
            })
        } else {
            let response = await doctorService.getProfileDoctorById(req.query.doctorId)
            if (response && response.errCode === 0) {
                return res.status(200).json(response)
            }
        }

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errcode: -1,
            errMessage: 'Error from server getExtraInforDoctorById'
        })
    }
}


let getListPatientForDoctor = async (req, res) => {
    try {
        if (!req.query) {
            return res.status(200).json({
                errcode: 1,
                errMessage: 'Error from getListPatientForDoctor server'
            })
        } else {
            let response = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date)
            if (response && response.errCode === 0) {
                return res.status(200).json(response)
            }
        }

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errcode: -1,
            errMessage: 'Error from server getListPatientForDoctor'
        })
    }
}

let sendRemedy = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(200).json({
                errcode: 1,
                errMessage: 'Error from sendRemedy server'
            })
        } else {
            let response = await doctorService.sendRemedy(req.body)
            if (response && response.errCode === 0) {
                return res.status(200).json(response)
            }
        }

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errcode: -1,
            errMessage: 'Error from server sendRemedy'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorById: getScheduleDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy,
}
