import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import Mainlayout from "~/components/layout/MainLayout";
import MainHome from "~/pages/MainHome";
import { MainHomeLoader } from "~/services/main-home";
import { SettingsLoaderResponse } from "~/services/settings";

export const meta: MetaFunction = () => [
  { title: "Elastic Pass" },
  { name: "description", content: "Welcome to Remix!" },
];

export const loader = async (params: LoaderFunctionArgs) => await MainHomeLoader(params);

const Index = () => {
  const loaderData = useLoaderData<SettingsLoaderResponse>();

  return (
    <Mainlayout isAuthenticated={loaderData?.isAuthenticated} name={loaderData?.name}>
      <MainHome />
    </Mainlayout>
  );
};

export default Index;
