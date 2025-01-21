import {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";
import { EventBookingLoader, EventBookingAction } from "services/main/event/event-booking";
import Mainlayout from "~/components/layout/MainLayout";
import EventBookingPage from "~/pages/Event/EventBooking";

export const meta: MetaFunction = () => [{ title: "Booking" }];

export const headers: HeadersFunction = () => ({
  "Cross-Origin-Embedder-Policy": "unsafe-none",
});

export const action = async (params: ActionFunctionArgs) => await EventBookingAction(params);

export const loader = async (params: LoaderFunctionArgs) => await EventBookingLoader(params);

export const clientLoader = async (params: ClientLoaderFunctionArgs) => cacheClientLoader(params);

clientLoader.hydrate = true;

const EventBooking = () => (
  <Mainlayout hasHideNavigation>
    <EventBookingPage />
  </Mainlayout>
);

export default EventBooking;
