import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await AuthService.login(
        email,
        password
      );

      return res
        .cookie("accessToken", accessToken, { httpOnly: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true })
        .status(200)
        .json({ message: "Login success!" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(400).json({ message: "No refresh token provided!" });
      }

      await AuthService.logout(refreshToken);

      return res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json({ message: "Logout successful!" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};
