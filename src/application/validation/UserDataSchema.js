const Joi = require('joi');
const MaritalStatus = require('../../shared/enum/MaritalStatus');
const OwnershipStatus = require('../../shared/enum/OwnershipStatus');

module.exports = Joi.object({
  age: Joi.number().min(0).max(120).required(),
  house: Joi.object({
    ownership_status: Joi.string().valid(...OwnershipStatus.values),
  }),
  income: Joi.number().min(0).required(),
  vehicle: Joi.object({
    year: Joi.number().integer(),
  }),
  dependents: Joi.number().min(0).required(),
  marital_status: Joi.string().valid(...MaritalStatus.values),
  risk_questions: Joi.array().length(3).items(Joi.number().valid(0, 1)),
});
