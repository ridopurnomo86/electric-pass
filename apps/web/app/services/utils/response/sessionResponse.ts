import { json } from "@remix-run/node";
import { commitSession } from "~/services/session.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sessionResponse = async (session: any, response: any) => {
  if (session)
    return json(
      { message: response },
      {
        headers: {
          "Set-Cookie": await commitSession(session), //will remove the flash message for you
          // "Set-Cookie": await commitSession(session, { maxAge: SESSION_MAX_AGE }), //re set max age if you previously set a max age for your sessions.
        },
      }
    );

  return null;
};

export default sessionResponse;
