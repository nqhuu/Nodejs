
// Add column to mysql 
// thêm cột historyText vào bảng markdown 

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('markdowns', 'historyText', {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('markdowns', 'historyText');
    },
};