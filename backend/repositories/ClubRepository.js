const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Club = sequelize.models.Club;

module.exports = {
  findAll: (page = 1, search = '') => Club.findAndCountAll({
    where: search ? { nome: { [Sequelize.Op.iLike]: `%${search}%` } } : {},
    limit: 7,
    offset: (page - 1) * 7,
    order: [['nome', 'ASC']]
  }),

  findById: (id) => Club.findByPk(id),
  findByEmail: (email) => Club.findOne({ where: { email } }),
  create: (clubData) => Club.create(clubData),
  update: (id, clubData) => Club.update(clubData, { where: { id } }),
  delete: (id) => Club.destroy({ where: { id } })
};