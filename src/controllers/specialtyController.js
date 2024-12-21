import specialtyService from "../services/specialtyService"

let createSpecialty = async (req, res) => {
    // console.log(req.body.nameSpecialty)
    try {
        if (!req.body
            || !req.body.descriptionHTML
            || !req.body.descriptionMarkdown
            || !req.body.imageBase64
            || !req.body.nameSpecialty
        ) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Error from server createSpecialty controller'
            })
        } else {
            let response = await specialtyService.createSpecialtyService(req.body)
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

let getAllSpecialty = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 50;
    try {
        let response = await specialtyService.getAllSpecialtyService(+limit)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'error from server'
        })
    }
}


let getDetailSpecialtyById = async (req, res) => {
    // console.log(req.query.id, req.query.location)
    try {
        let response = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location)
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
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,

}