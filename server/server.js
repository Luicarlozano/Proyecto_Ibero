import express from "express";
import "dotenv/config";
import connectDB from "./config/dbConnect.js";
import apiRouter from "./routes/apiRouter.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;
connectDB()

app.use(express.json());
app.use(cors());
app.use("", apiRouter);



app.listen(port, () =>{
   console.log(`Server is running on port: ${port}`)
})

