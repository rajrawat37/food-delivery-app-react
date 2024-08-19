import mongoose from "mongoose";

export const connectDB = async () => {
    (await mongoose.connect('mongodb+srv://greatstack:Helloworld321@cluster0.hngbi.mongodb.net/food-deivery-react-app')
        .then(() => console.log("DB Connected")));
}

