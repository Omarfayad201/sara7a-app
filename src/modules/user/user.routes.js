import { Router } from "express";
import * as userController from './user.controller.js'
import { checkEmail } from "../../middleware/checkEmail.js";
import { validation } from "../../middleware/validation.js";
import { forgetCodeSchema, schemaSigninVal, schemaSignupVal } from "./user.validation.js";
const router = Router()


router.post("/signup", validation(schemaSignupVal), checkEmail, userController.signup);

router.post("/signin", validation(schemaSigninVal), userController.signin);

router.get("/verify/:token", userController.verify);

router.patch('/forgetCode',validation(forgetCodeSchema) ,userController.sendForgetCode);


export { router };