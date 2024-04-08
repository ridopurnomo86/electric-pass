import { LoaderFunction, json } from "@remix-run/node";
import { commitSession, getSession } from "../session.server";

const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const message = session.get("create-account") || null;

  return json(
    { message },
    {
      headers: {
        "Set-Cookie": await commitSession(session), //will remove the flash message for you
        // "Set-Cookie": await commitSession(session, { maxAge: SESSION_MAX_AGE }), //re set max age if you previously set a max age for your sessions.
      },
    }
  );
};

export default loader;
