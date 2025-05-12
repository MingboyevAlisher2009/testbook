import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import MongoDB from "./db/index.js";
import path from "path";

const app = express();
// const __dirname = path.resolve();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes

app.get("/api", (req, res) => {
  res.send("hello");
});

// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await MongoDB();
  console.log(`Server running on port: http://localhost:${PORT}`);
});
