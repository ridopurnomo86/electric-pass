import React from "react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

type MainLayoutPropsType = {
  children: React.ReactNode;
};

const Mainlayout = ({ children }: MainLayoutPropsType) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Mainlayout;
