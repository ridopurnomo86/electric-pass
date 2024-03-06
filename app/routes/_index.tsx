import type { MetaFunction } from "@vercel/remix";
import Mainlayout from "~/components/layout/MainLayout";
import MainHome from "~/pages/MainHome";

export const meta: MetaFunction = () => [
  { title: "Elastic Pass" },
  { name: "description", content: "Welcome to Remix!" },
];

const Index = () => (
  <Mainlayout>
    <MainHome />
  </Mainlayout>
);

export default Index;
