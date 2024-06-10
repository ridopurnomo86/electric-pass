import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";
import Mainlayout from "~/components/layout/MainLayout";
import ProfilePage from "~/pages/Settings";
import { SettingsProfileLoader, SettingsProfileAction } from "~/services/main/settings";

export const meta: MetaFunction = () => [{ title: "Profile" }];

export const action = async (params: ActionFunctionArgs) => await SettingsProfileAction(params);

export const loader = async (params: LoaderFunctionArgs) => await SettingsProfileLoader(params);

export const clientLoader = async (params: ClientLoaderFunctionArgs) => cacheClientLoader(params);

clientLoader.hydrate = true;

const SettingsProfile = () => {
  const loaderData = useLoaderData<typeof SettingsProfileLoader>();

  return (
    <Mainlayout isAuthenticated={loaderData?.isAuthenticated} name={loaderData?.name}>
      <ProfilePage />
    </Mainlayout>
  );
};

export default SettingsProfile;
