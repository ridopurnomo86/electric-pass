import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import ForgotPasswordPage from "~/pages/ForgotPassword";
import ForgotPasswordLoader from "services/main/forgot-password/loader";

export const meta: MetaFunction = () => [{ title: "Forgot Password" }];

export const loader = async (params: LoaderFunctionArgs) => await ForgotPasswordLoader(params);

const ForgotPassword = () => <ForgotPasswordPage />;

export default ForgotPassword;
