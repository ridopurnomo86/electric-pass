import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Mainlayout from "~/components/layout/MainLayout";
import ProjectsPage from "~/pages/Settings/project/MainProject";
import { ProjectLoader } from "~/services/main/settings/project";

export const meta: MetaFunction = () => [{ title: "Project" }];

export const loader = async (params: LoaderFunctionArgs) => await ProjectLoader(params);

const Projects = () => (
  <Mainlayout>
    <ProjectsPage />
  </Mainlayout>
);

export default Projects;
