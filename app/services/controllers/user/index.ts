import { Prisma } from "@prisma/client";
import { json } from "@remix-run/node";
import { db } from "~/services/prisma.server";
import { decrypt } from "~/services/utils/cipher/encrypt";

const UserController = {
  getUser: async ({
    type,
    id,
    response,
    select,
  }: {
    type: "user" | "organizer" | string;
    id: number;
    response?: {
      [key: string]: string | number | boolean;
    };
    select?: {
      [key: string]: boolean;
    };
  }) => {
    try {
      if (type === "user") {
        const checkingUser = await db.user.findFirst({
          where: {
            id,
          },
          select,
        });

        return { ...checkingUser, ...response };
      } else {
        const checkingUser = await db.organizer.findFirst({
          where: {
            id,
          },
          select,
        });

        return { ...checkingUser, ...response };
      }
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
  authorizeUser: async ({ email, password }: { email: string; password: string }) => {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      const match = await decrypt({ value: password, hash: user.password });

      if (match) return { ...user, role: "user" };

      throw new Error(
        JSON.stringify({ message: "Password incorrect", type: "error", status: "Error" })
      );
    }

    const organizer = await db.organizer.findFirst({
      where: {
        email,
      },
    });

    if (organizer) {
      const match = await decrypt({ value: password, hash: organizer.password });

      if (match) return { ...organizer, role: "organizer" };

      throw new Error(
        JSON.stringify({ message: "Password incorrect", type: "error", status: "Error" })
      );
    }

    throw new Error(
      JSON.stringify({ message: "Email doesn't exists", type: "error", status: "Error" })
    );
  },
  registerUser: async ({
    data,
    encryptPassword,
  }: {
    data: {
      [key: string]: string;
    };
    encryptPassword: string;
  }) => {
    let createUser;

    try {
      if (data.account_type === "visitor") {
        const checkingUserIsOrganizer = await db.organizer.findUnique({
          where: {
            email: data.email,
          },
          select: {
            email: true,
          },
        });

        if (checkingUserIsOrganizer)
          return json({
            status: "Error",
            type: "error",
            message: `A user has been created as a "Organizer"`,
          });

        createUser = await db.user.create({
          data: {
            email: data.email,
            name: data.name,
            password: encryptPassword,
          },
        });
      } else {
        const checkingUserIsVisitor = await db.user.findUnique({
          where: {
            email: data.email,
          },
          select: {
            email: true,
          },
        });

        if (checkingUserIsVisitor)
          return json({
            status: "Error",
            type: "error",
            message: `A user has been created as a "Visitor"`,
          });

        createUser = await db.organizer.create({
          data: {
            email: data.email,
            name: data.name,
            password: encryptPassword,
          },
        });
      }

      if (createUser) return createUser;

      return json({ status: "Error", type: "error", message: "Sorry, email is exist" });
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
};

export default UserController;
