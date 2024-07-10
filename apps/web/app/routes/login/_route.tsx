import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import LoginPage from "~/pages/Login";
import { LoginAction, LoginLoader } from "~/services/main/login";

export const meta: MetaFunction = () => [{ title: "Login" }];

export const loader = async (params: LoaderFunctionArgs) =>
  await LoginLoader(params);

export const action = async (params: ActionFunctionArgs) =>
  await LoginAction(params);

const Login = () => <LoginPage />;

export default Login;
