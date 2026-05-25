import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import route from "./routes/routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", route);

app.get("/", (req, res) => res.json({ message: "API is running" }));

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`),
);
