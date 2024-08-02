import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";
import Mainlayout from "~/components/layout/MainLayout";
import AccountPage from "~/pages/Settings/Account";
import { SettingsAccountLoader, SettingsAccountAction } from "~/services/main/settings/account";

export const meta: MetaFunction = () => [{ title: "Account" }];

export const action = async (params: ActionFunctionArgs) => await SettingsAccountAction(params);

export const loader = async (params: LoaderFunctionArgs) => await SettingsAccountLoader(params);

export const clientLoader = async (params: ClientLoaderFunctionArgs) => cacheClientLoader(params);

clientLoader.hydrate = true;

const Account = () => (
  <Mainlayout>
    <AccountPage />
  </Mainlayout>
);

export default Account;
