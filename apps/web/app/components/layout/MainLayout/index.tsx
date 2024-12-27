import { useOutletContext } from "@remix-run/react";
import React from "react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import ScrollToTop from "../ScrollToTop";

type MainLayoutPropsType = {
  children: React.ReactNode;
  hasHideNavigation?: boolean;
};

const Mainlayout = ({ children, hasHideNavigation = false }: MainLayoutPropsType) => {
  const { user } = useOutletContext<{ user: { name: string; email: string } }>();

  return (
    <>
      <Navbar
        hasHideNavigation={hasHideNavigation}
        isAuthenticated={Boolean(user)}
        name={user?.name}
      />
      {typeof window !== "undefined" && <ScrollToTop />}
      {children}
      <Footer />
    </>
  );
};
export default Mainlayout;
