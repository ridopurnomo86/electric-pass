import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { EventDetailAction, EventDetailLoader } from "services/main/event/event-detail";
import Mainlayout from "~/components/layout/MainLayout";
import EventDetailPage from "~/pages/Event/EventDetail";

const renderDescriptionContent = (title: string) =>
  `See available schedules, locations and ticket prices for ${title.toUpperCase()}. Buy tickets or order online only at Electric Pass`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const meta: MetaFunction = ({ data, location }: any) => [
  { title: `${data.eventDetail.name} | Electric Pass` },
  { name: "keywords", content: "organize event, sell event" },
  { name: "author", content: process.env.HOSTNAME },
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
    content: `${process.env.HOSTNAME}${location.pathname}`,
  },
];

export const action = async (params: ActionFunctionArgs) => await EventDetailAction(params);

export const loader = async (params: LoaderFunctionArgs) => await EventDetailLoader(params);

const EventDetail = () => (
  <Mainlayout>
    <EventDetailPage />
  </Mainlayout>
);
export default EventDetail;
