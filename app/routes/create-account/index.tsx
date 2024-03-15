import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import CreateAccountPage from "~/pages/CreateAccount";
import CreateAccountAction from "~/services/create-account";

export const meta: MetaFunction = () => [{ title: "Create Account" }];

export const action = async (params: ActionFunctionArgs) => await CreateAccountAction(params);

const CreateAccount = () => <CreateAccountPage />;

export default CreateAccount;
