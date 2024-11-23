import { json } from "@remix-run/node";
import { commitSession } from "services/session.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sessionResponse = async (session: any, response: any) => {
  if (session)
    return json(
      { message: response },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );

  return null;
};

export default sessionResponse;
