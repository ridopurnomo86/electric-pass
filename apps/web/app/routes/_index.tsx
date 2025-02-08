import type { LoaderFunctionArgs, MetaFunction, HeadersFunction } from "@remix-run/node";
import Mainlayout from "~/components/layout/MainLayout";
import MainHomePage from "~/pages/MainHome";
import { MainHomeLoader } from "services/main/main-home";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") as string,
});

export const meta: MetaFunction<typeof MainHomeLoader> = ({ data }) => [
  { title: "Electric Pass: Create Free Events, Organize Events & Sell Your Own Events" },
  {
    name: "description",
    content:
      "Now you can create events, organize events, sell event tickets yourself, create event invitations online and have the opportunity to be promoted by Electric Pass affiliates.",
  },
  { name: "keywords", content: "create event, organize event, sell event" },
  { name: "author", content: data.hostname },
  { name: "type", content: "website" },
  {
    property: "og:title",
    content: "Electric Pass: Create Free Events, Organize Events & Sell Your Own Events",
  },
  { name: "og:type", content: "website" },
  { name: "og:url", content: data.hostname },
  {
    name: "og:description",
    content:
      "Now you can create events, organize events, sell event tickets yourself, create event invitations online and have the opportunity to be promoted by Electric Pass affiliates.",
  },
];

export const loader = async (params: LoaderFunctionArgs) => await MainHomeLoader(params);

export const clientLoader = async (params: ClientLoaderFunctionArgs) => cacheClientLoader(params);

clientLoader.hydrate = true;

const MainHome = () => (
  <Mainlayout>
    <MainHomePage />
  </Mainlayout>
);

export default MainHome;
