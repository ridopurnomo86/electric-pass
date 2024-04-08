import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import LoginPage from "~/pages/Login";
import { LoginLoader } from "~/services/login";

export const meta: MetaFunction = () => [{ title: "Login" }];

export const loader = async (params: LoaderFunctionArgs) => await LoginLoader(params);

const Login = () => <LoginPage />;

export default Login;
