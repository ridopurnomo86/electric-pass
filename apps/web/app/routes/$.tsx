import { json } from "@remix-run/node";
import Mainlayout from "~/components/layout/MainLayout";
import ErrorPage from "~/pages/Error";

export const loader = () => json("Not Found", { status: 404 });

const Error = () => (
  <Mainlayout hasHideNavigation>
    <ErrorPage />
  </Mainlayout>
);

export default Error;
