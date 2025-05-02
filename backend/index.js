import express from "express";
import dotenv from "dotenv";

import { connectDb } from "./db/db.js";
import UserRoute from "./Routes/UserRoute.js";
import TaskRoute from "./Routes/TaskRoute.js";
import morgan from "morgan";
import cors from "cors";
const app = express();

// config
dotenv.config();

connectDb();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["https://task-handlers.netlify.app", "http://localhost:5173/"],
  })
);

app.use("/api/user", UserRoute);
app.use("/api/task", TaskRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || PORT;

app.listen(PORT, () => {
  console.log(`Serever listing on port ${PORT}`);
});
