import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

//middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Request: ", req.method, req.path);
  next();
});

//routers
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
