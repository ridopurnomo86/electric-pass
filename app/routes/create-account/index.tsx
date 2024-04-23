import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import CreateAccountPage from "~/pages/CreateAccount";
import { CreateAccountAction, CreateAccountLoader } from "~/services/create-account";

export const meta: MetaFunction = () => [{ title: "Create Account" }];

export const action = async (params: ActionFunctionArgs) => await CreateAccountAction(params);

export const loader = async (params: ActionFunctionArgs) => await CreateAccountLoader(params);

const CreateAccount = () => <CreateAccountPage />;

export default CreateAccount;
