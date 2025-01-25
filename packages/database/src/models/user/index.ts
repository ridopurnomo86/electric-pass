import dayjs from "dayjs";
import { db } from "../../";
import { decrypt } from "../../utils/cipher/encrypt";
import {
  AuthorizeUserResponseType,
  AuthorizeUserType,
  GetUserType,
  RegisterUserType,
  UpdateUserType,
} from "./types";

const UserModel = {
  getUser: async ({ id, response, select }: GetUserType) => {
    const checkingUser = await db.user.findFirst({
      where: {
        id,
      },
      select,
    });

    if (!checkingUser) throw new Error("User not exists");

    return { ...checkingUser, ...response };
  },
  getUserImage: async ({ id, response }: GetUserType) => {
    const user = await db.userImageProfile.findFirst({
      where: {
        userId: id,
      },
    });

    if (!user) throw new Error("User image not exists");

    return { ...user, ...response };
  },
  authorizeUser: async ({ email, password }: AuthorizeUserType): AuthorizeUserResponseType => {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      const match = await decrypt({ value: password, hash: user.password });

      if (match) return { ...user, role: user.role?.toLowerCase() };

      throw new Error("Incorrect password");
    }

    throw new Error("User not exists");
  },
  registerUser: async ({ data, encryptPassword, salt }: RegisterUserType) => {
    const checkingUser = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (checkingUser?.email === data.email) throw new Error("User has been created");

    await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: encryptPassword,
        role: data.account_type === "visitor" ? "USER" : "ORGANIZER",
        salt,
        updated_at: dayjs().format(),
      },
    });

    throw new Error("A new user cannot be created with this email.");
  },
  updateUser: async ({ id, data = {} }: UpdateUserType) => {
    const user = await db.user.update({
      where: {
        id,
      },
      data,
    });

    if (!user) throw new Error("A new user cannot be update with this user.");

    return { ...user };
  },
};

export default UserModel;
