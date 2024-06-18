import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";
import Mainlayout from "~/components/layout/MainLayout";
import ProfilePage from "~/pages/Settings";
import { SettingsProfileLoader, SettingsProfileAction } from "~/services/main/settings";

export const meta: MetaFunction = () => [{ title: "Profile" }];

export const action = async (params: ActionFunctionArgs) => await SettingsProfileAction(params);

export const loader = async (params: LoaderFunctionArgs) => await SettingsProfileLoader(params);

export const clientLoader = async (params: ClientLoaderFunctionArgs) => cacheClientLoader(params);

clientLoader.hydrate = true;

const SettingsProfile = () => (
  <Mainlayout>
    <ProfilePage />
  </Mainlayout>
);

export default SettingsProfile;
