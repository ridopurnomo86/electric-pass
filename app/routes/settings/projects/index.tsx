import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Mainlayout from "~/components/layout/MainLayout";
import ProjectsPage from "~/pages/Settings/Projects";
import ProjectLoader from "~/services/main/settings/projects/loader";

export const meta: MetaFunction = () => [{ title: "Projects" }];

export const loader = async (params: LoaderFunctionArgs) => await ProjectLoader(params);

const Security = () => {
  const loaderData = useLoaderData<typeof ProjectLoader>();

  return (
    <Mainlayout isAuthenticated={loaderData?.isAuthenticated} name={loaderData?.name}>
      <ProjectsPage />
    </Mainlayout>
  );
};

export default Security;
