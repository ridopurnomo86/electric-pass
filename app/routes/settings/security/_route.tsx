import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Mainlayout from "~/components/layout/MainLayout";
import SecurityPage from "~/pages/Settings/Security";
import { SecurityAction, SecurityLoader } from "~/services/main/settings/security";

export const meta: MetaFunction = () => [{ title: "Profile" }];

export const action = async (params: ActionFunctionArgs) => await SecurityAction(params);

export const loader = async (params: LoaderFunctionArgs) => await SecurityLoader(params);

const Security = () => {
  const loaderData = useLoaderData<typeof SecurityLoader>();

  return (
    <Mainlayout isAuthenticated={loaderData?.isAuthenticated} name={loaderData?.name}>
      <SecurityPage />
    </Mainlayout>
  );
};

export default Security;
