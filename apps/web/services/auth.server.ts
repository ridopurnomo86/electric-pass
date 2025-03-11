import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";

type AuthenticatorResponseType = {
  id: number;
  name: string;
  role: string | undefined;
  email: string;
};

export const authenticator = new Authenticator<AuthenticatorResponseType>(sessionStorage, {
  throwOnError: true,
  sessionErrorKey: "user-error",
});

const formStrategy = new FormStrategy(async ({ form }): Promise<AuthenticatorResponseType> => {
  const email = form.get("email") as string;
  const role = form.get("role") as string;
  const id = form.get("id");
  const name = form.get("name") as string;

  return { id: Number(id), name, role, email };
});

authenticator.use(formStrategy, "user-pass");

export default { authenticator };
