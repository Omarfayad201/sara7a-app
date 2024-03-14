import bcrypt from "bcrypt";
import { User } from "../../DB/models/user.model.js";
import { AppError } from "../utils/appError.js";

export const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const isUser = await User.findOne({ email:email });
    if (isUser)
        return next(new AppError("user is already exists!", 409));

    req.body.password = bcrypt.hashSync(req.body.password, 8);
    next()
};
