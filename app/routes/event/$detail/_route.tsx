import { MetaFunction } from "@remix-run/node";
import Mainlayout from "~/components/layout/MainLayout";
import Event from "~/pages/Event";

export const meta: MetaFunction = () => [{ title: "Event" }];

const ForgotPassword = () => (
  <Mainlayout>
    <Event />
  </Mainlayout>
);
export default ForgotPassword;
