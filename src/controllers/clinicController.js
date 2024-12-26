import clinicService from "../services/clinicService"

let createClinic = async (req, res) => {
    try {
        if (!req.body
            || !req.body.descriptionHTML
            || !req.body.descriptionMarkdown
            || !req.body.imageBase64
            || !req.body.nameClinic
            || !req.body.address
        ) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Error from server createSpecialty controller'
            })
        } else {
            let response = await clinicService.createClinicService(req.body)
            return res.status(200).json(response)
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errcode: -1,
            errMessage: 'Error from server createSpecialty controller catch'
        })
    }
}


let getAllClinic = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 50;
    try {
        let response = await clinicService.getAllClinicService(+limit)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'error from server'
        })
    }
}


let getDetailClinicById = async (req, res) => {
    try {
        let response = await clinicService.getDetailClinicById(req.query.id)
        if (response && response.errCode === 0) {
            return res.status(200).json(response)
        }
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    getAllClinic: getAllClinic,
    createClinic: createClinic,
    getDetailClinicById: getDetailClinicById,
}