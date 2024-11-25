'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {


        await queryInterface.createTable('doctor_infor', {
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            priceId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            provinceId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            paymentId: {
                type: Sequelize.STRING,
                allowNull: false

            },
            nameClinic: {
                type: Sequelize.STRING,
                allowNull: false

            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,

            },
            addressClinic: {
                type: Sequelize.STRING
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },

            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('doctor_infor');
    }
};