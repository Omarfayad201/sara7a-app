
import { Router } from "express";
import * as messageController from "./message.controller.js"
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { schemaAddMessageVal } from "./message.validation.js";
const mesRouter = Router();

mesRouter.post("/message",validation(schemaAddMessageVal) ,messageController.addMessage);

mesRouter.get("/message", auth, messageController.allMessage);



export { mesRouter }; 