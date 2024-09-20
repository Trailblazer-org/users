import express from "express";
import UserController from "../controllers/register.controller"; // Same controller

export const userRouter = express.Router();

// Route to get all users
userRouter.get("/", UserController.handleGetAllUsers);
