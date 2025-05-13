import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import MongoDB from "./db/index.js";
import authRoutes from "./routes/auth.routes.js";
import booksRoutes from "./routes/books.routes.js";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await MongoDB();
  console.log(`Server running on port: http://localhost:${PORT}`);
});
