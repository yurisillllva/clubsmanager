const Club = require('../models/Club');

module.exports = {
  findAll: () => Club.findAll(),
  findById: (id) => Club.findByPk(id),
  findByEmail: (email) => Club.findOne({ where: { email } }),
  create: (clubData) => Club.create(clubData),
  update: (id, clubData) => Club.update(clubData, { where: { id } }),
  delete: (id) => Club.destroy({ where: { id } })
};