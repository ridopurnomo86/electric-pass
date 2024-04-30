import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Mainlayout from "~/components/layout/MainLayout";
import ProfilePage from "~/pages/Profile";
import { ProfileAction, ProfileLoader, ProfileLoaderResponseType } from "~/services/profile";

export const meta: MetaFunction = () => [{ title: "Profile" }];

export const action = async (params: ActionFunctionArgs) => await ProfileAction(params);

export const loader = async (params: LoaderFunctionArgs) => await ProfileLoader(params);

const Profile = () => {
  const loaderData = useLoaderData<ProfileLoaderResponseType>();

  return (
    <Mainlayout isAuthenticated={loaderData?.isAuthenticated} name={loaderData?.name}>
      <ProfilePage />
    </Mainlayout>
  );
};

export default Profile;
