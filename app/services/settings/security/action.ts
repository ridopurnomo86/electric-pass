import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

const SecurityAction = async ({ request }: ActionFunctionArgs) => {
  const { _action } = await request.json();

  if (_action === "logout") return await authenticator.logout(request, { redirectTo: "/login" });

  return null;
};

export default SecurityAction;
