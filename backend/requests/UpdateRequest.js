const Joi = require('joi');

module.exports = Joi.object({
  nome: Joi.string(),
  email: Joi.string().email(),
  telefone: Joi.string(),
  cidade_sede: Joi.string()
}).min(1);