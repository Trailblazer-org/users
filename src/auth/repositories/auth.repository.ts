import { Auth } from "../models/auth.schema";

export const AuthRepository = {
  create: async (userId: string, refreshToken: string) => {
    const newAuth = new Auth({ userId, refreshToken });
    return newAuth.save();
  },
  findOneAndDelete: async (refreshToken: string) => {
    return Auth.findOneAndDelete({ refreshToken });
  },
};
