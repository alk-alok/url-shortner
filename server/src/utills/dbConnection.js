import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

await mongoose.connect(process.env.DB_STRING).then(
    ()=>{console.log("We've connected with database.")}
).catch((err)=>{
    console.log("Error in Connecting database!", err.message);
}); 