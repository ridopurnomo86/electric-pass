import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import ProfilePage from "~/pages/Profile";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => [{ title: "Profile" }];

export const loader = async ({ request }: LoaderFunctionArgs) =>
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

const Profile = () => <ProfilePage />;

export default Profile;
