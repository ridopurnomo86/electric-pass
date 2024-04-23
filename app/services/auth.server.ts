import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";
import verifyLogin from "./utils/auth/user/verifyLogin";

export const authenticator = new Authenticator(sessionStorage, {
  throwOnError: true,
  sessionErrorKey: "user-error",
});

const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const user = await verifyLogin(email, password);

  return user;
});

authenticator.use(formStrategy, "user-pass");

export default { authenticator };
