import express from "express";
import { AuthController } from "../controller/auth.controller";

export const logoutRouter = express.Router();

logoutRouter.post("/", AuthController.logout);
