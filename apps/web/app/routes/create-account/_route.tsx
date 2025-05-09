import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import CreateAccountPage from "~/pages/CreateAccount";
import { CreateAccountAction, CreateAccountLoader } from "services/main/create-account";

export const meta: MetaFunction = () => [{ title: "Create Account" }];

export const action = async (params: ActionFunctionArgs) => await CreateAccountAction(params);

export const loader = async (params: LoaderFunctionArgs) => await CreateAccountLoader(params);

const CreateAccount = () => <CreateAccountPage />;

export default CreateAccount;
