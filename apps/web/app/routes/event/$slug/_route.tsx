import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";
import { EventDetailAction, EventDetailLoader } from "services/main/event/event-detail";
import Mainlayout from "~/components/layout/MainLayout";
import EventDetailPage from "~/pages/Event/EventDetail";

export const meta: MetaFunction = () => [{ title: "Event" }];

export const action = async (params: ActionFunctionArgs) => await EventDetailAction(params);

export const loader = async (params: LoaderFunctionArgs) => await EventDetailLoader(params);

export const clientLoader = async (params: ClientLoaderFunctionArgs) => cacheClientLoader(params);

const EventDetail = () => (
  <Mainlayout>
    <EventDetailPage />
  </Mainlayout>
);
export default EventDetail;
