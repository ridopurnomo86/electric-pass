import { MetaFunction } from "@remix-run/node";
import CreateAccountPage from "~/pages/CreateAccount";

export const meta: MetaFunction = () => [{ title: "Create Account" }];

const CreateAccount = () => <CreateAccountPage />;

export default CreateAccount;
