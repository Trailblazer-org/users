import { Request, Response } from "express";

async function getAllUser(req: Request, res: Response) {
  return res.json({
    message: "Get all users",
    users: ["user1", "user2", "user3"],
  });
}

export default getAllUser;
