import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import stylesheet from "~/styles/globals.css";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { RootLoader } from "services/main/root";
import { Toaster } from "./components/ui/Toaster/toaster";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const loader = async (params: LoaderFunctionArgs) => await RootLoader(params);

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
