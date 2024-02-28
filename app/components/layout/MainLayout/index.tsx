import React from "react";
import Navbar from "~/components/Navbar";

type MainLayoutPropsType = {
  children: React.ReactNode;
};

const Mainlayout = ({ children }: MainLayoutPropsType) => (
  <>
    <Navbar />
    {children}
  </>
);

export default Mainlayout;
