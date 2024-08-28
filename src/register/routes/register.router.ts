import express from "express";
import UserController from "../controllers/register.controller";

export const registerRouter = express.Router();

registerRouter.get("/", UserController.handleGetAllUsers);

registerRouter.post("/", UserController.handleRegister);
