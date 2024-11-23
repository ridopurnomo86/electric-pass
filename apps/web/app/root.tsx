import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import stylesheet from "~/styles/globals.css";
import { csrf } from "services/csrf.server";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { authenticator } from "../services/auth.server";
import { Toaster } from "./components/ui/Toaster/toaster";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const loader = async (args: LoaderFunctionArgs) => {
  const [token, cookieHeader] = await csrf.commitToken();
  const user = await authenticator.isAuthenticated(args.request);

  return json(
    {
      user,
      ENV: { BACKEND_URL: process.env.BACKEND_URL, API_KEY: process.env.API_KEY },
      csrf: token,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { headers: { "Set-Cookie": cookieHeader } as any }
  );
};

export default function App() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthenticityTokenProvider token={loaderData.csrf}>
          <Outlet context={loaderData} />
        </AuthenticityTokenProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.process = ${JSON.stringify({
              env: loaderData.ENV,
            })}`,
          }}
        />
        <ScrollRestoration />
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
