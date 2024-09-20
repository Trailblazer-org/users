import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/auth.repository";
import { UserRepository } from "../repositories/user.repositry";

export const AuthService = {
  async login(email: string, password: string) {
    if (!email || password.length < 8) {
      throw new Error(
        "Invalid email or password. Password must be more than 8 characters!"
      );
    }

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found!");
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!isPasswordMatch) {
      throw new Error("Invalid password!");
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN as string,
      {
        expiresIn: 300,
      }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN as string,
      {
        expiresIn: "3d",
      }
    );

    await AuthRepository.create(user.id, refreshToken);

    return { accessToken, refreshToken };
  },

  async logout(refreshToken: string) {
    await AuthRepository.findOneAndDelete(refreshToken);
  },
};
