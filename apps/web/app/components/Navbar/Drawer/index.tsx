"use client";

import { Icon } from "@iconify/react";
import Logo from "~/assets/electric-pass-logo.svg";
import {
  Drawer as CoreDrawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/Drawer";
import { Link } from "@remix-run/react";
import Navigation from "./Navigation";

type DrawerPropsType = {
  name: string;
  isAuthenticated: boolean;
};

const Drawer = ({ name, isAuthenticated }: DrawerPropsType) => (
  <CoreDrawer direction="left">
    <DrawerTrigger className="hidden max-[894px]:block" asChild>
      <button className="hidden rounded-md border p-2 max-[894px]:block">
        <Icon icon="material-symbols:bar-chart-rounded" className="rotate-[270deg] text-2xl" />
      </button>
    </DrawerTrigger>
    <DrawerPortal>
      <DrawerOverlay className="fixed inset-0 bg-black/40" />
      <DrawerContent className="fixed bottom-0 right-0 mt-24 flex h-full w-[400px] flex-col bg-white">
        <DrawerTitle className="mb-4 flex w-full items-center justify-between border-b p-6">
          <Link to="/">
            <div className="">
              <img src={Logo} alt="electric-pass-logo" className="w-[200px]" />
            </div>
          </Link>
          <DrawerTrigger className="hidden max-[894px]:block" asChild>
            <button className="hidden rounded-md border p-2 max-[894px]:block">
              <Icon icon="ep:close-bold" className="rotate-[270deg] text-2xl" />
            </button>
          </DrawerTrigger>
        </DrawerTitle>
        <Navigation isAuthenticated={isAuthenticated} name={name} />
      </DrawerContent>
    </DrawerPortal>
  </CoreDrawer>
);

export default Drawer;
