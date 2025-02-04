import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import db from "@monorepo/database";
import { sessionStorage } from "./session.server";

type AuthenticatorResponseType = {
  id: number;
  name: string;
  role: string | undefined;
};

export const authenticator = new Authenticator<AuthenticatorResponseType>(sessionStorage, {
  throwOnError: true,
  sessionErrorKey: "user-error",
});

const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email") as string;

  const password = form.get("password") as string;

  const user = await db.UserModel.authorizeUser({ email, password });

  return { id: user.id, name: user.name, role: user.role };
});

authenticator.use(formStrategy, "user-pass");

export default { authenticator };
