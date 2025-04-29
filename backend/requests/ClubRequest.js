const Joi = require('joi');

module.exports = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().required(),
  cidade_sede: Joi.string().required()
});