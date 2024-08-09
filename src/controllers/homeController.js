import db from "../models/index"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render("homePage.ejs", {
            data: JSON.stringify(data)
        })
        // Khi sử dụng render thì tìm các file trong thư mục view đã set bên viewEngine.js : app.set("views", "./src/views")
    } catch (e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.render("about/about.ejs")
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs")
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
}