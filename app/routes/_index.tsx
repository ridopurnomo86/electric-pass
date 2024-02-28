import type { MetaFunction } from "@vercel/remix";
import Mainlayout from "~/components/layout/MainLayout";

export const meta: MetaFunction = () => [
  { title: "Elastic Pass" },
  { name: "description", content: "Welcome to Remix!" },
];

const Index = () => (
  <Mainlayout>
    <div>main</div>
  </Mainlayout>
);

export default Index;
