const Joi = require('joi');

module.exports = {
   UserSchema: {
      login: Joi.object({
         phone: Joi.string().min(7).max(11).required(),
         password: Joi.string().min(8).required()
      }),
      register: Joi.object({
         name: Joi.string().required(),
         email: Joi.string().min(12).required(),
         phone: Joi.string().min(7).max(11).required(),
         password: Joi.string().min(8).required()
      })
   },
   AllSchema: {
      id: Joi.object({
         id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
      })
   }
}