import { MetaFunction } from "@remix-run/node";
import LoginPage from "~/pages/Login";

export const meta: MetaFunction = () => [{ title: "Login" }];

const Login = () => <LoginPage />;

export default Login;
