import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "services/auth.server";

const CreateAccountLoader: LoaderFunction = async ({ request }) =>
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

export default CreateAccountLoader;
