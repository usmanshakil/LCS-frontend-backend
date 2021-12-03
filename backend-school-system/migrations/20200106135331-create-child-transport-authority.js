'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('child_transport_authorities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      has_parent_drop_off: {
        type: Sequelize.ENUM
      },
      has_parent_pick_up: {
        type: Sequelize.ENUM
      },
      has_supervised_walk: {
        type: Sequelize.ENUM
      },
      has_public_private_van: {
        type: Sequelize.ENUM
      },
      has_program_bus_van: {
        type: Sequelize.ENUM
      },
      has_contract_van: {
        type: Sequelize.ENUM
      },
      has_private_transport_arranged_by_parent: {
        type: Sequelize.ENUM
      },
      has_other: {
        type: Sequelize.ENUM
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('child_transport_authorities');
  }
};