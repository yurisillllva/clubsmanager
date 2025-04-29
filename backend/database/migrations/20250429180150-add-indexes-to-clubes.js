'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addIndex('clubes', ['nome']);
    await queryInterface.addIndex('clubes', ['email']);
    await queryInterface.addIndex('clubes', ['cidade_sede']);
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex('clubes', ['nome']);
    await queryInterface.removeIndex('clubes', ['email']);
    await queryInterface.removeIndex('clubes', ['cidade_sede']);
  }
};
