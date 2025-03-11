/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";
import { EventDetailAction, EventDetailLoader } from "services/main/event/event-detail";
import Mainlayout from "~/components/layout/MainLayout";
import EventDetailPage from "~/pages/Event/EventDetail";

const renderDescriptionContent = (title: string) =>
  `See available schedules, locations and ticket prices for ${title.toUpperCase()}. Buy tickets or order online only at Electric Pass`;

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") as string,
});

export const meta: MetaFunction = ({ data, location }: any) => [
  { title: `${data.eventDetail.name} | Electric Pass` },
  { name: "keywords", content: "organize event, sell event" },
  { name: "author", content: data.hostname },
  { name: "type", content: "article" },
  { name: "og:site_name", content: "Electric Pass" },
  {
    property: "og:title",
    content: `${data.eventDetail.name} | Electric Pass`,
  },
  {
    name: "description",
    content: renderDescriptionContent(data.eventDetail.name),
  },
  {
    name: "og:description",
    content: renderDescriptionContent(data.eventDetail.name),
  },
  {
    name: "og:image",
    content: data.eventDetail.image_url,
  },
  {
    name: "og:url",
    content: `${data.hostname}${location.pathname}`,
  },
];

export const action = async (params: ActionFunctionArgs) => await EventDetailAction(params);

export const loader = async (params: LoaderFunctionArgs) => await EventDetailLoader(params);

export const clientLoader = async (params: ClientLoaderFunctionArgs) => cacheClientLoader(params);

clientLoader.hydrate = true;

const EventDetail = () => (
  <Mainlayout>
    <EventDetailPage />
  </Mainlayout>
);
export default EventDetail;
