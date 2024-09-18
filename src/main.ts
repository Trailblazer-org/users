import express from "express";
import middlewareCheckOrigin from "./middlewares/middleware.check-origin";
import { registerRouter } from "./register/routes/register.router";
import { loginRouter } from "./auth/routes/login.router";
import { logoutRouter } from "./auth/routes/logout.router";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { mongoConnect } from "./utils/mongoose";

dotenv.config();

const app = express();

mongoConnect();

app.use(express.json());
app.use(cors());

app.use(cookieParser());

// Middleware
app.use(middlewareCheckOrigin);

// Proses register
app.use("/register", registerRouter);

// Proses login
app.use("/login", loginRouter);

// Proses logout
app.use("/logout", logoutRouter);

app.get("/", registerRouter);

// SERVER LISTENING
app.listen(8003, () => console.log("Server started on port 8003"));
