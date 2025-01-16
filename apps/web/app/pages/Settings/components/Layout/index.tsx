import React, { Suspense } from "react";
import { Await, useLocation, useOutletContext } from "@remix-run/react";
import ProfileLoading from "../../loading";
import Navigation from "./Navigation";

type ContextPropsType = {
  user: { name: string; role: "organizer" | "user"; email: string };
};

type ProfileLayoutPropsType = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve?: any;
};

const ProfileLayout = ({ children, resolve }: ProfileLayoutPropsType) => {
  const location = useLocation();
  const { user } = useOutletContext<ContextPropsType>();

  return (
    <main className="container mx-auto min-h-screen">
      <div className="border-b py-8">
        <p className="text-2xl font-bold tracking-tight text-neutral-900">Settings</p>
        <p className="font-medium text-neutral-500">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-[15%,85%]">
        <Navigation role={user.role} />
        <Suspense key={location.key} fallback={<ProfileLoading />}>
          <Await resolve={resolve}>{children}</Await>
        </Suspense>
      </div>
    </main>
  );
};

export default ProfileLayout;
