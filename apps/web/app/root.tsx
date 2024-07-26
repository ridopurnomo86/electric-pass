import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import stylesheet from "~/styles/globals.css";
import { Toaster } from "./components/ui/Toaster/toaster";
import { authenticator } from "./services/auth.server";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const loader = async (args: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(args.request);

  return json({
    user,
    ENV: { BACKEND_URL: process.env.BACKEND_URL, API_KEY: process.env.API_KEY },
  });
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
        <Outlet context={loaderData} />
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
