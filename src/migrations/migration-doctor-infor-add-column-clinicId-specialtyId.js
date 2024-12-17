
// Add column to mysql 
// thêm cột historyText vào bảng doctor_infor 


module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('doctor_infor', 'specialtyId', {
            type: Sequelize.INTEGER,
            // allowNull: true,
            // defaultValue: '',
        });

        await queryInterface.addColumn('doctor_infor', 'clinicId', {
            type: Sequelize.INTEGER,
            // allowNull: true,
            // defaultValue: '',
        });
    },

    async down(queryInterface, Sequelize) {
        // await queryInterface.removeColumn('doctor_infor', 'specialtyId');
        await queryInterface.removeColumn('doctor_infor', 'clinicId');
    },
};