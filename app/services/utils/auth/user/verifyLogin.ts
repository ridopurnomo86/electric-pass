import bcrypt from "bcryptjs";
import { db } from "../../../prisma.server";

const verifyLogin = async (email: string, password: string) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password as string);
    if (match) return user;
    throw new Error(
      JSON.stringify({ message: "Password incorrect", type: "error", status: "Error" })
    );
  }

  throw new Error(
    JSON.stringify({ message: "Email doesn't exists", type: "error", status: "Error" })
  );
};

export default verifyLogin;
