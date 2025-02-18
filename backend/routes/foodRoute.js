import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

//foodRouter is a router object that is created using express.Router().
//This router would contain specific routes related to food, such as listing food items, adding new food items, updating food items, etc.
//The router allows you to modularize and organize your routes related to a specific domain (in this case, food).

//so basically to modularize the routes for food a foodRouter file is made here.

const foodRouter = express.Router();
//Once a router is defined, we need to "mount" it to a specific path in our main application using app.use().
//This allows all routes defined in the router to be accessible under a common path prefix.

// Image Storage Engine
// Multer is a middleware for handling multipart/form-data

// multipart/form-data is one of the encoding types specified in HTML forms.
// It is used when we need to upload files along with other form data (like text fields) to a server.

//Without Multer, handling multipart/form-data would be quite cumbersome
//because we would need to manually parse the incoming request, extract the files, handle storage.

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;

//express.Router() is a powerful feature in Express.js that allows us to create modular route handlers.
//By using routers, we can structure our application in a way that is organized, maintainable, and scalable.
//Each router can handle a specific set of routes, and these can be mounted onto the main application with specific path prefixes.
