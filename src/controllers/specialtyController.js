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


module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
}