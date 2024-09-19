import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";
import { rabbitmq } from "../../utils/rabbitmq";

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.login(
        email,
        password
      );

      // Send RabbitMQ message here in the controller
      const channel = await rabbitmq();
      const message = JSON.stringify({
        userId: user.id, // Include user ID in the message
        email: user.email, // Optionally include email
        timestamp: Date.now(), // Add a timestamp
      });
      channel.sendToQueue("userLoggedIn", Buffer.from(message));

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
