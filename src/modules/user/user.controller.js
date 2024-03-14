import { User } from "../../../DB/models/user.model.js"
import { sendEmail } from "../../emails/sendEmail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import randomString from "randomstring";

export const signup = catchError(async (req, res,next) => {
    

     await User.insertMany(req.body);
     // sendEmail(req.body.email)
     return res.json({ success: true, message: "signup successfully" });
 
  
 
});

export const verify = catchError((req, res,next) => {
  jwt.verify(req.params.token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) return next(new AppError(err, 401));
    await User.findOneAndUpdate(
      { email: decoded.email },
      { verifyEmail: true }
    );
    res.json({ success: true, message: "verifyEmail is change to true" });
  });
});

export const signin = catchError(async (req, res,next) => {
  let isUser = await User.findOne({ email: req.body.email });
  if (
    isUser &&
    // isUser.verifyEmail &&
    bcrypt.compareSync(req.body.password, isUser.password)
  ) {
    let token = jwt.sign(
      { userId: isUser._id, email: isUser.email },
      "secretKey"
    );
    res.json({ success: true, result: "you can login", token });
  }
  // if (isUser.verifyEmail==true) return res.json({ success: false, message: "u must be signup first!" });
  
    next(new AppError("incorrect email or password or you must signUp first!", 401));
});

export const sendForgetCode = catchError(async (req, res, next) => {
  // check user email
  let {email} = req.body.email
  let isUser = await User.findOne(email);
  if (!isUser) return next(new AppError("user not found", 401));
  if(!isUser.isActive) return next(new AppError("you must activate first !"))


  const code = randomString.generate({
    length: 5,
    charset: "numberic",
  });

  isUser.forgetCode = code;
  await isUser.save();
  let text = "reset password!"
  let respond = `<div>${code}</div>`
  const messageSend = await sendEmail({ email, text , respond});
  if(!messageSend) return next(new AppError("message is required!",401))
  return res.json({success:true})

});
