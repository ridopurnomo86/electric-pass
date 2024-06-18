import { useOutletContext } from "@remix-run/react";
import React from "react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import ScrollToTop from "../ScrollToTop";

type MainLayoutPropsType = {
  children: React.ReactNode;
};

const Mainlayout = ({ children }: MainLayoutPropsType) => {
  const user = useOutletContext<{ name: string; email: string }>();

  return (
    <>
      <Navbar isAuthenticated={Boolean(user)} name={user?.name} />
      {typeof window !== "undefined" && <ScrollToTop />}
      {children}
      <Footer />
    </>
  );
};
export default Mainlayout;
