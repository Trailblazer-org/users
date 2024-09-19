import UserRepository from "../repositories/register.repository";
import bcrypt from "bcrypt";
import { Response } from "express";
// import { rabbitmq } from "../../utils/rabbitmq";

const UserServices = {
  getAll: async () => {
    try {
      const allUsers = await UserRepository.getAll();

      return allUsers;
    } catch (error) {
      console.log("error", error);
    }
  },

  register: async (
    name: string,
    email: string,
    password: string,
    res: Response
  ) => {
    try {
      // Check if the user already exists
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 13);

      // Prepare the new user object
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };

      // Create the new user
      const createdUser = await UserRepository.create(newUser);

      // product message => send to rabbitMQ
      // const channel = await rabbitmq();
      // channel.sendToQueue();

      return res
        .status(201)
        .json({ message: "Register Success!!", data: createdUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to register user", error });
    }
  },
};

export default UserServices;
