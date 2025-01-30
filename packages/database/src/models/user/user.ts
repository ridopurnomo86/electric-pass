import dayjs from "dayjs";
import { db } from "../..";
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
    try {
      const checkingUser = await db.user.findFirst({
        where: {
          id,
        },
        select,
      });

      if (!checkingUser)
        return {
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        };

      return { ...checkingUser, ...response };
    } catch (err) {
      if (err)
        return {
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        };
      throw err;
    }
  },
  getUserImage: async ({ id, response }: GetUserType) => {
    try {
      const user = await db.userImageProfile.findFirst({
        where: {
          userId: id,
        },
      });

      if (!user)
        return {
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        };

      return { ...user, ...response };
    } catch (err) {
      if (err)
        return {
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        };
      throw err;
    }
  },
  authorizeUser: async ({
    email,
    password = "",
    id,
  }: AuthorizeUserType): AuthorizeUserResponseType => {
    const user = await db.user.findFirst({
      where: {
        ...(email && { email }),
        ...(id && { id }),
      },
    });

    if (user) {
      const match = await decrypt({ value: password, hash: user.password });

      if (match) return { ...user, role: user.role?.toLowerCase() };

      throw new Error(
        JSON.stringify({
          message: "Password incorrect",
          type: "error",
          status: "Error",
        })
      );
    }

    throw new Error(
      JSON.stringify({
        message: "User not exist",
        type: "error",
        status: "Error",
      })
    );
  },
  registerUser: async ({ data, encryptPassword, salt }: RegisterUserType) => {
    try {
      const checkingUser = await db.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (checkingUser?.email === data.email)
        return {
          status: "Error",
          type: "error",
          message: `A user has been created.`,
        };

      await db.user.create({
        data: {
          email: String(data.email),
          name: String(data.name),
          password: encryptPassword,
          role: data.account_type === "visitor" ? "USER" : "ORGANIZER",
          salt,
          updated_at: dayjs().format(),
        },
      });

      return {
        status: "Error",
        type: "error",
        message: "Sorry, email is exist",
      };
    } catch (err) {
      if (err)
        return {
          status: "Error",
          type: "error",
          message: "A new user cannot be created with this email.",
        };
      throw err;
    }
  },
  updateUser: async ({ id, data = {} }: UpdateUserType) => {
    try {
      const user = await db.user.update({
        where: {
          id,
        },
        data,
      });

      if (!user)
        return {
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        };

      return { ...user };
    } catch (err) {
      if (err)
        return {
          status: "Error",
          type: "error",
          message: "A user cannot be update.",
        };
      throw err;
    }
  },
};

export default UserModel;
