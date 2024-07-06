import { ClientLoaderFunctionArgs } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { cacheClientLoader } from "remix-client-cache";
import Mainlayout from "~/components/layout/MainLayout";
import MainHome from "~/pages/MainHome";
import { MainHomeLoader } from "~/services/main/main-home";

export const meta: MetaFunction = () => [
  { title: "Elastic Pass" },
  { name: "description", content: "Welcome to Remix!" },
];

export const loader = async (params: LoaderFunctionArgs) => await MainHomeLoader(params);

export const clientLoader = async (params: ClientLoaderFunctionArgs) => cacheClientLoader(params);

clientLoader.hydrate = true;

const Index = () => (
  <Mainlayout>
    <MainHome />
  </Mainlayout>
);

export default Index;
