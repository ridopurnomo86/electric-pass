import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "services/session.server";
import { authenticator } from "services/auth.server";
import { destroySession } from "services/booking-session.server";
import { csrf } from "services/csrf.server";

const RootLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const headers = new Headers();
  const bookingSession = await getSession(request.headers.get("Cookie"));

  const [token, cookieHeader] = await csrf.commitToken();
  const user = await authenticator.isAuthenticated(request);

  // Reference https://github.com/remix-run/remix/issues/231
  headers.append("Set-Cookie", cookieHeader as string);
  if (!request.url.includes("/book"))
    headers.append("Set-Cookie", await destroySession(bookingSession));

  return json(
    {
      user,
      ENV: {
        BACKEND_URL: process.env.BACKEND_URL,
        API_KEY: process.env.API_KEY,
        HOSTNAME: process.env.HOSTNAME,
      },
      csrf: token,
    },
    { headers }
  );
};

export default RootLoader;