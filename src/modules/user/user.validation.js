
import joi from "joi";

const schemaSignupVal = joi.object({
  name: joi.string().min(3).max(20).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^[A-Z][a-z0-9@#$]{8,40}$/)
    .required(),
  rePassword: joi.valid(joi.ref("password")).required(),
  age: joi.number().integer().min(18).max(70),
});

const schemaSigninVal = joi.object({

  email: joi.string().email().required(),
  password: joi.string().pattern(/^[A-Z][a-z0-9@#$]{8,40}$/).required()
});

 const forgetCodeSchema = joi.object({
  email: joi.string().email().required(),
}).required();


export { schemaSignupVal, schemaSigninVal, forgetCodeSchema };