import express from "express";
import router from "./src/routes/index.js"
import "./src/utills/dbConnection.js";
import cors from "cors";


const app = express();
const port = process.env.PORT || 8001;

app.use(express.json())
app.use(cors());

app.use(router)

app.listen(port, ()=>{
    console.log(`App is running on port:${port}`)
});