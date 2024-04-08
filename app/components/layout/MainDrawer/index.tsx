import { Icon } from "@iconify/react";
import Logo from "~/assets/elastic-pass-logo.svg";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/Drawer";
import { Link } from "@remix-run/react";

const MainDrawer = () => (
  <Drawer direction="left">
    <DrawerTrigger className="hidden max-[894px]:block" asChild>
      <button className="hidden rounded-md border p-2 max-[894px]:block">
        <Icon icon="material-symbols:bar-chart-rounded" className="rotate-[270deg] text-2xl" />
      </button>
    </DrawerTrigger>
    <DrawerPortal>
      <DrawerOverlay className="fixed inset-0 bg-black/40" />
      <DrawerContent className="fixed bottom-0 right-0 mt-24 flex h-full w-[400px] flex-col bg-white">
        <DrawerTitle className="mb-4 flex w-full items-center justify-between border-b-[1px] p-6">
          <Link to="/">
            <div className="">
              <img src={Logo} alt="elastic-pass-logo" className="w-[200px]" />
            </div>
          </Link>
          <DrawerTrigger className="hidden max-[894px]:block" asChild>
            <button className="hidden rounded-md border p-2 max-[894px]:block">
              <Icon icon="ep:close-bold" className="rotate-[270deg] text-2xl" />
            </button>
          </DrawerTrigger>
        </DrawerTitle>
        <div className="flex size-full flex-col justify-between bg-white px-4 pb-4 pt-2">
          <div>
            <p className="mb-2 p-2 text-sm text-neutral-600 antialiased">Main Menu</p>
            <nav className="space-y-2">
              <Link
                to="#"
                className="flex cursor-pointer items-center rounded-md p-2 hover:bg-neutral-100"
              >
                <Icon icon="ic:round-home" className="text-2xl text-neutral-600" />
                <p className="ml-3 mt-1 text-sm font-medium text-neutral-600 antialiased">Home</p>
              </Link>
              <Link
                to="#"
                className="flex cursor-pointer items-center rounded-md p-2 hover:bg-neutral-100"
              >
                <Icon icon="ic:round-dashboard" className="text-2xl text-neutral-600" />
                <p className="ml-3 mt-1 text-sm font-medium text-neutral-600 antialiased">
                  Dashboard
                </p>
              </Link>
              <Link
                to="#"
                className="flex cursor-pointer items-center rounded-md p-2 hover:bg-neutral-100"
              >
                <Icon icon="oui:app-reporting" className="text-2xl text-neutral-600" />
                <p className="ml-3 mt-1 text-sm font-medium text-neutral-600 antialiased">
                  Reporting
                </p>
              </Link>
              <Link
                to="#"
                className="flex cursor-pointer items-center rounded-md p-2 hover:bg-neutral-100"
              >
                <Icon
                  icon="material-symbols:logout-rounded"
                  className="text-2xl text-neutral-600"
                />
                <p className="ml-3 mt-1 text-sm font-medium text-neutral-600 antialiased">Logout</p>
              </Link>
            </nav>
          </div>
          <div className="border-t-[1px] pt-4">
            <nav className="space-y-2">
              <Link
                to="#"
                className="flex cursor-pointer items-center rounded-md p-2 hover:bg-neutral-100"
              >
                <Icon icon="ri:login-circle-fill" className="text-2xl text-neutral-600" />
                <p className="ml-3 mt-1 text-sm font-medium text-neutral-600 antialiased">
                  Login / Create Account
                </p>
              </Link>
            </nav>
          </div>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </Drawer>
);

export default MainDrawer;
