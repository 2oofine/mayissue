import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import projectsRoutes from "./routes/projects";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); //logging (add for production in the future "combined")

// register routes
app.use("/api/projects", projectsRoutes);

export default app;
