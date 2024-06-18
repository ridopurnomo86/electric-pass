import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

const MainHomeLoader: LoaderFunction = async ({ request }) =>
  await authenticator.isAuthenticated(request);

export default MainHomeLoader;
