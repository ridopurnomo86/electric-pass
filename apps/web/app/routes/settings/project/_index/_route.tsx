import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Mainlayout from "~/components/layout/MainLayout";
import ProjectsPage from "~/pages/Settings/project/MainProject";
import { ProjectLoader } from "services/main/settings/project";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";

export const meta: MetaFunction = () => [{ title: "Project" }];

export const loader = async (params: LoaderFunctionArgs) => await ProjectLoader(params);

export const clientLoader = async (params: ClientLoaderFunctionArgs) => cacheClientLoader(params);

clientLoader.hydrate = true;

const Projects = () => (
  <Mainlayout>
    <ProjectsPage />
  </Mainlayout>
);

export default Projects;
