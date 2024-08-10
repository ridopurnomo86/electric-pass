import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";
import Mainlayout from "~/components/layout/MainLayout";
import CreateProjectPage from "~/pages/Settings/project/CreateProject";
import { SettingsCreateProjectLoader } from "~/services/main/settings/project/create-project";

export const meta: MetaFunction = () => [{ title: "Create Project" }];

export const loader = async (params: LoaderFunctionArgs) =>
  await SettingsCreateProjectLoader(params);

export const clientLoader = async (params: ClientLoaderFunctionArgs) => cacheClientLoader(params);

clientLoader.hydrate = true;

const SettingsCreateProject = () => (
  <Mainlayout>
    <CreateProjectPage />
  </Mainlayout>
);

export default SettingsCreateProject;
