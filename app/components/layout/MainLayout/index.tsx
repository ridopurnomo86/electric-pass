import React from "react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

type MainLayoutPropsType = {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  name?: string;
};

const Mainlayout = ({ children, isAuthenticated = false, name = "" }: MainLayoutPropsType) => (
  <>
    <Navbar isAuthenticated={isAuthenticated} name={name} />
    {children}
    <Footer />
  </>
);

export default Mainlayout;
