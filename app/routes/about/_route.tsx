import { MetaFunction } from "@remix-run/node";
import AboutPage from "~/pages/About";

export const meta: MetaFunction = () => [
  { title: "About" },
  { name: "description", content: "Welcome to Remix!" },
];

const About = () => <AboutPage />;

export default About;
