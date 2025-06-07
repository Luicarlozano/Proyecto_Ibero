import express from "express";
import "dotenv/config";
import connectDB from "./config/dbConnect.js";
import apiRouter from "./routes/api.routers.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

app.use(express.json());
app.use(cors());
app.use("", apiRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}
