const Joi = require('joi');

module.exports.employeeSchema=Joi.object({
    employee:Joi.object({
        f_name:Joi.string().required(),
        l_name:Joi.string().required(),
        email:Joi.string().required(),
        job_title:Joi.string().required(),
        dept:Joi.string().required(),
        supervisor:Joi.string().required(),
        country:Joi.string().required(),
        state:Joi.string().required(),
        city:Joi.string().required(),
    }).required()
})