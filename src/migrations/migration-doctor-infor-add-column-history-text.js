
// Add column to mysql 
// thêm cột historyText vào bảng doctor_infor 

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('doctor_infor', 'historyText', {
            type: Sequelize.DataTypes.STRING,
            // allowNull: false,
            defaultValue: '',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('doctor_infor', 'historyText');
    },
};