import express from "express";
import middlewareCheckOrigin from "./middlewares/middleware.check-origin";
import { registerRouter } from "./register/routes/register.router";
import { loginRouter } from "./auth/routes/login.router";
import { logoutRouter } from "./auth/routes/logout.router";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { mongoConnect } from "./utils/mongoose";
import UserController from "./register/controllers/register.controller";
import { userRouter } from "./register/routes/user.route";

dotenv.config();

const app = express();

mongoConnect();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8000", // Allow requests from the API Gateway
    credentials: true, // Allow cookies and other credentials
  })
);

app.use(cookieParser());

// Middleware
app.use(middlewareCheckOrigin);

// Proses register
app.use("/register", registerRouter);

// Proses login
app.use("/login", loginRouter);

// Proses logout
app.use("/logout", logoutRouter);

// Get All user
app.use("/allusers", userRouter);

// SERVER LISTENING
app.listen(8003, () => console.log("Server started on port 8003"));
