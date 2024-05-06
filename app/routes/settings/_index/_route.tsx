import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Mainlayout from "~/components/layout/MainLayout";
import ProfilePage from "~/pages/Settings";
import { ProfileAction, ProfileLoader, SettingsLoaderResponse } from "~/services/settings";

export const meta: MetaFunction = () => [{ title: "Profile" }];

export const action = async (params: ActionFunctionArgs) => await ProfileAction(params);

export const loader = async (params: LoaderFunctionArgs) => await ProfileLoader(params);

const Settings = () => {
  const loaderData = useLoaderData<SettingsLoaderResponse>();

  return (
    <Mainlayout isAuthenticated={loaderData?.isAuthenticated} name={loaderData?.name}>
      <ProfilePage />
    </Mainlayout>
  );
};

export default Settings;
