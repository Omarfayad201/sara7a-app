import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, min: [18, "too short age"], max: [70, "top longer age"] },
    role: { type: String, enum: ['user', 'admin'], default: "user" },
    verifyEmail: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  forgetCode:{type:String,unique:true},
    
}, { timestamps: true })

export const User = model("user", userSchema);