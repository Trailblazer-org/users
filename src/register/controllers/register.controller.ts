import { Request, Response } from "express";
import UserServices from "../services/register.services";

const UserController = {
  handleGetAllUsers: async (req: Request, res: Response) => {
    const allNotes = await UserServices.getAll();
    return res.json({ data: allNotes });
  },

  handleRegister: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    return await UserServices.register(name, email, password, res);
  },
};

export default UserController;
