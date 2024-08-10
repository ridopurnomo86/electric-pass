import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { userAccess } from "~/services/utils/cookies";

export const action = async (params: ActionFunctionArgs) =>
  await authenticator.logout(params.request, {
    redirectTo: "/login",
    headers: {
      "Set-Cookie": await userAccess.serialize("", {
        maxAge: 1,
      }),
    },
  });
