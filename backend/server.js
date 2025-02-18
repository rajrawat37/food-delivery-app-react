import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";

//app config
const app = express(); //creates an instance of an Express application
const port = 4000;

//middleware
//app.use() is used to add middleware to the Express application.

app.use(express.json()); //JSON payloads are automatically parsed into JavaScript objects, making it easy to access and work with the data

//Cross-Origin Resource Sharing (CORS).
app.use(cors()); // enabled CORS for all routes and origins by default.

/**  This means the API will be accessible from any other domain, 
    allowing the frontend application or other external clients to interact with your backend API.
    Without enabling CORS, the frontend application would be blocked from making requests 
    to http://localhost:${port} due to the same-origin policy. **/

//db connection
connectDB(); //connection with mongooseeeeee

//api endpoints
app.use("/api/food", foodRouter);
// The string "/api/food" is a base path. It means that all routes defined in foodRouter will be prefixed with /api/food.
app.use("/images", express.static("uploads")); //mounted the uploads folder in the /images endpoint
//so now i can access any file in that folder
app.use("/api/user", userRouter);

app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

// mongodb+srv://<USERNAME>:<PASSWORD>@<HOST>/? 
