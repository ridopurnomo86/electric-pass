import React from "react";
import Navigation from "./Navigation";
import { useLoaderData } from "@remix-run/react";
import { SettingsProfileLoader } from "~/services/main/settings";

type ProfileLayoutPropsType = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutPropsType) => {
  const loaderData = useLoaderData<typeof SettingsProfileLoader>();

  return (
    <main className="container mx-auto min-h-screen">
      <div className="border-b-[1px] py-8">
        <p className="text-2xl font-bold tracking-tight text-neutral-900">Settings</p>
        <p className="font-medium text-neutral-500">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-[15%,85%]">
        <Navigation role={loaderData.role} />
        {children}
      </div>
    </main>
  );
};

export default ProfileLayout;
