import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";

export const authenticator = new Authenticator(sessionStorage);

const formStrategy = new FormStrategy(async ({ form }) => {
  const defaultUser = {
    email: "admin",
    password: "admin",
  };
  const email = form.get("email");
  const password = form.get("password");

  if (email !== defaultUser.email || password !== defaultUser.password)
    throw new AuthorizationError();

  return defaultUser;
});

authenticator.use(formStrategy, "form");

export default { authenticator };
