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

export default app;
