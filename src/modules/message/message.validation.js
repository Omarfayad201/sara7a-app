

import joi from "joi";

const schemaAddMessageVal = joi.object({
    message: joi.string().min(3).max(200).required(),
    receivedId: joi.string().hex().length(24),
});


export { schemaAddMessageVal };