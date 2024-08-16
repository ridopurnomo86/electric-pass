import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const action = async (params: ActionFunctionArgs) =>
  await authenticator.logout(params.request, {
    redirectTo: "/login",
  });
