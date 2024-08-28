import { User } from "../../register/models/user.schema";

export const UserRepository = {
  findByEmail: async (email: string) => {
    return User.findOne({ email });
  },
};
