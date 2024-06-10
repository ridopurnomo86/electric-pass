import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";
import UserController from "./controllers/user";

type AuthenticatorResponseType = {
  id: number;
  name: string;
  isAuthenticated: boolean;
  role: string;
};

export const authenticator = new Authenticator<AuthenticatorResponseType>(sessionStorage, {
  throwOnError: true,
  sessionErrorKey: "user-error",
});

const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const user = await UserController.authorizeUser({ email, password });

  return { id: user.id, name: user.name, role: user.role, isAuthenticated: true };
});

authenticator.use(formStrategy, "user-pass");

export default { authenticator };
