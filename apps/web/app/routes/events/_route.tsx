import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { MainEventLoader } from "services/main/event/main-event";
import MainEvents from "~/pages/Event/MainEvents";
import MainEventsLoading from "~/pages/Event/MainEvents/loading";

export const meta: MetaFunction = () => [{ title: "Events" }];

export const loader = async (params: LoaderFunctionArgs) => await MainEventLoader(params);

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const [serverData] = await Promise.all([serverLoader()]);

  return {
    serverData,
  };
}

clientLoader.hydrate = true;

export const HydrateFallback = () => <MainEventsLoading />;

const Events = () => <MainEvents />;

export default Events;
