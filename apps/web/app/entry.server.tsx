import { PassThrough } from "node:stream";
import type { EntryContext, HandleDataRequestFunction } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { cors } from "remix-utils/cors";

const ABORT_DELAY = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]: () => {
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          cors(
            request,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            new Response(body as any, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
            {
              credentials: true,
              maxAge: 600,
            }
          ).then((response) => {
            resolve(response);
          });

          pipe(body);
        },
        onShellError: (err: unknown) => {
          reject(err);
        },
        onError: (error: unknown) => {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

export const handleDataRequest: HandleDataRequestFunction = async (response, { request }) =>
  await cors(request, response);
