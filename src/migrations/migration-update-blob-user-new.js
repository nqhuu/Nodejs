// đổi kiểu dữ liệu

module.exports = {
    // update lại kiểu dữ liệu
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },


    // quy về kiểu dữ liệu trước đó
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'Users', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};