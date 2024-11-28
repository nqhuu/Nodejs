
// Add column to mysql 

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('doctor_infor', 'id', {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('doctor_infor', 'id');
    },
};