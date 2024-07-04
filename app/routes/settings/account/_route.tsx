import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";
import Mainlayout from "~/components/layout/MainLayout";
import AccountPage from "~/pages/Settings/Account";
import { AccountProfileLoader, AccountProfileAction } from "~/services/main/settings/account";

export const meta: MetaFunction = () => [{ title: "Account" }];

export const action = async (params: ActionFunctionArgs) => await AccountProfileAction(params);

export const loader = async (params: LoaderFunctionArgs) => await AccountProfileLoader(params);

export const clientLoader = async (params: ClientLoaderFunctionArgs) => cacheClientLoader(params);

clientLoader.hydrate = true;

const Account = () => (
  <Mainlayout>
    <AccountPage />
  </Mainlayout>
);

export default Account;
