import express from "express";
import middlewareCheckOrigin from "./middlewares/middleware.check-origin";
import getAllUser from "./controllers/users.controller";

const app = express();

// Middleware
app.use(middlewareCheckOrigin);

app.get("/", getAllUser);

// SERVER LISTENING
app.listen(8003, () => console.log("Server started on port 8003"));
