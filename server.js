process.on("uncaughtException", (err) => {
    console.log("err", err);
});
import express from 'express'
import { dbConnect } from './DB/dbConnection.js';
import { router } from './src/modules/user/user.routes.js';
import {mesRouter} from "./src/modules/message/message.routes.js"
import { AppError } from './src/utils/appError.js';
import { globalError } from './src/middleware/globalErrorMiddleware.js';
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
const app = express()
const port = 3000
app.use(cors())

console.log(process.env.JWT_KEY);
app.use(express.json());

app.use(router);
app.use(mesRouter);

await dbConnect();


app.use(globalError);

app.use("*",(req, res, next) => {
  next(new AppError(`page not found: ${req.originalUrl}!` , 404));
});

process.on("unhandledRejection", (err) => {
    console.log("err" , err);
})

app.listen(port, () => console.log(` app listening on port ${port}!`));