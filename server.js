import express from "express";
import bodyParser from "express";
import mongoose from "mongoose";

import userRouter from "./routes/User.js";
import contactRouter from "./routes/Contact.js";
import { config } from "dotenv";
import cors from "cors";

const app = express();
app.use(bodyParser.json());

//.env setup
config({ path: ".env" });

//CORS
app.use(
  cors({
    origin: true,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

//mongoDb connection
mongoose
  .connect(process.env.MongoUrl, {
    dbName: "Contact_API",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

//user Router
app.use("/api/user", userRouter);

//contact Router
app.use("/api/contact", contactRouter);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
