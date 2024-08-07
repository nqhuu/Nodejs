let getHomePage = (req, res) => {
    return res.render("homePage.ejs")
    // Khi sử dụng render thì tìm các file trong thư mục view đã set bên viewEngine.js : app.set("views", "./src/views")
}

module.exports = {
    getHomePage: getHomePage,
}