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



module.exports = {
    createClinic: createClinic,
}