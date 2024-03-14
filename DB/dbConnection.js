import mongoose from "mongoose";


export const dbConnect = async () => {
    return await mongoose.connect(
        "mongodb+srv://omarfayad123:omarsameh123@cluster0.eezzy0p.mongodb.net/sara7a"
    ).then(() => {
        console.log("DB connected successfully !");
    }).catch((err) => {
        console.log("error", err);
    })
};


