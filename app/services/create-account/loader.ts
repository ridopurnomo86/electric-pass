import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "../auth.server";

const CreateAccountLoader: LoaderFunction = async ({ request }) =>
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

export default CreateAccountLoader;
