let handleLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing'
        })
    }

    let user
    // check tồn tại email
    // compare password
    // return user Infor
    // access_token: JWT Json web token
    return res.status(200).json({
        errCode: 0,
        message: 'hello',
        email: email,
        password: password
    })
}

module.exports = {
    handleLogin: handleLogin
}