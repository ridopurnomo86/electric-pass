import React from "react";
import Navigation from "./Navigation";

type ProfileLayoutPropsType = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutPropsType) => (
  <main className="mx-auto container min-h-screen">
    <div className="border-b-[1px] py-8">
      <p className="text-2xl font-bold tracking-tight text-neutral-900">Settings</p>
      <p className="text-md font-medium text-neutral-500">
        Manage your account settings and set e-mail preferences.
      </p>
    </div>
    <div className="grid gap-4 grid-cols-[200px_minmax(900px,_1fr)_100px] pt-8">
      <Navigation />
      {children}
    </div>
  </main>
);

export default ProfileLayout;
