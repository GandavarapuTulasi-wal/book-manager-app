'use strict';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'tulasimadhu',
        password: bcrypt.hashSync('tulasi123', salt),
        email: 'tulasi@gmail.com',
        address: 'magunta layout,Nellore',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'kalyanmadhu',
        password: bcrypt.hashSync('kalyan123', salt),
        email: 'kalyan@gmail.com',
        address: 'Hitech city,Hyderabad',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      [Op.or]: [{ username: 'tulasimadhu' }, { username: 'kalyanmadhu' }],
    });
  },
};
