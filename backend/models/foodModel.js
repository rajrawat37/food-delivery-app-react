import mongoose from "mongoose";


//Defines the structure, types, and validation rules for documents in a MongoDB collection. 
//It serves as a blueprint for how documents should be structured.

const foodSchema = new mongoose.Schema({
    name : {type:String,required:true},
    description: {type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
})


//Models in mongoose are similar to classes in OOPS
//Models defines the schema (structure) and provides methods for database operations.
const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);

//Mongoose models provide methods for interacting with the MongoDB collection, such as .save(), .find(), .findById(), etc

export default foodModel;