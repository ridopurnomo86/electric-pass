import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Mainlayout from "~/components/layout/MainLayout";
import ProjectsPage from "~/pages/Settings/Projects";
import { ProjectLoader } from "~/services/main/settings/projects";

export const meta: MetaFunction = () => [{ title: "Projects" }];

export const loader = async (params: LoaderFunctionArgs) =>
  await ProjectLoader(params);

const Projects = () => (
  <Mainlayout>
    <ProjectsPage />
  </Mainlayout>
);

export default Projects;
