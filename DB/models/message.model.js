import mongoose, { Schema, model } from "mongoose";

const schemaMessage = new Schema({
    message: String,
    receivedId: mongoose.Types.ObjectId,

},{timestamps:true});

export const Massage = model("message", schemaMessage);



