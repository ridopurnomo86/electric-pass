import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import Mainlayout from "~/components/layout/MainLayout";
import MainHome from "~/pages/MainHome";
import { MainHomeLoader } from "services/main/main-home";

export const meta: MetaFunction = () => [
  { title: "Elastic Pass" },
  { name: "description", content: "Welcome to Remix!" },
];

export const loader = async (params: LoaderFunctionArgs) => await MainHomeLoader(params);

const Index = () => (
  <Mainlayout>
    <MainHome />
  </Mainlayout>
);

export default Index;
