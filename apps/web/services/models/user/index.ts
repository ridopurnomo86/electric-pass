import { Prisma } from "@prisma/client";
import { json } from "@remix-run/node";
import dayjs from "dayjs";
import { db } from "services/prisma.server";
import { decrypt } from "services/utils/cipher/encrypt";
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
        return json({
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        });

      return { ...checkingUser, ...response };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        return json({
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        });
      throw json(err);
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
        return json({
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        });

      return { ...user, ...response };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        return json({
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        });
      throw json(err);
    }
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
        return json(
          {
            status: "Error",
            type: "error",
            message: `A user has been created.`,
          },
          { status: 500 }
        );

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

      return json({
        status: "Error",
        type: "error",
        message: "Sorry, email is exist",
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        return json({
          status: "Error",
          type: "error",
          message: "A new user cannot be created with this email.",
        });
      throw json(err);
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
        return json({
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        });

      return { ...user };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        return json({
          status: "Error",
          type: "error",
          message: "A user cannot be update.",
        });
      throw json(err);
    }
  },
};

export default UserModel;
