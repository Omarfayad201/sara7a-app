import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTempate.js';
import jwt from "jsonwebtoken";
export const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "samehomar429@gmail.com",
      pass: "fnkityupzsudgkwv",
    },
  });
  let token = jwt.sign({ email }, "nameSecret")
  const info = await transporter.sendMail({
    from: '"omar 👻" <samehomar429@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "fu ✔", // Subject line
    html: emailTemplate(token), // html body
  });
  console.log("Message sent: %s", info.messageId);
};