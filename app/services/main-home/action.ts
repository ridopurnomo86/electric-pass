import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "../auth.server";

const MainHomeAction = async ({ request }: ActionFunctionArgs) => {
  const { _action } = await request.json();

  if (_action === "logout") return await authenticator.logout(request, { redirectTo: "/login" });

  return null;
};

export default MainHomeAction;
