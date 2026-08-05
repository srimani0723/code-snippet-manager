import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import snippetRoute from "./routes/snippetRoute.js";
import collectionRoute from "./routes/collectionRoute.js";
import compilerRoute from "./routes/compilerRoute.js";
import aiRoute from "./routes/aiRoute.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL_V2,
      "http://localhost:5173",
      "http://localhost:4173",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Code Snippet Manager API");
});

app.use("/api/auth", authRoute);
app.use("/api/snippets", snippetRoute);
app.use("/api/collections", collectionRoute);
app.use("/api/compiler", compilerRoute);
app.use("/api/ai", aiRoute);

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
