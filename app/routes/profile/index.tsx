import { MetaFunction } from "@remix-run/node";
import ProfilePage from "~/pages/Profile";

export const meta: MetaFunction = () => [
  { title: "Profile" },
  { name: "description", content: "Welcome to Remix!" },
];

const Profile = () => <ProfilePage />;

export default Profile;
