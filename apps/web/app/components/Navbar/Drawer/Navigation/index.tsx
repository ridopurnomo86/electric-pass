import { Link } from "@remix-run/react";
import { Icon } from "@iconify/react";

type NavigationPropsType = {
  isAuthenticated: boolean;
  name: string;
};

const Navigation = ({ isAuthenticated, name }: NavigationPropsType) => (
  <div className="flex size-full flex-col justify-between bg-white px-4 pb-4 pt-2">
    <div className="flex h-full flex-col justify-between">
      <div>
        <p className="mb-2 p-2 text-sm text-neutral-600 antialiased">
          Main Menu
        </p>
        <nav className="space-y-2">
          <Link
            to="/"
            className="flex cursor-pointer items-center rounded-md p-2 hover:bg-neutral-100"
          >
            <Icon icon="ic:round-home" className="text-2xl text-neutral-600" />
            <p className="ml-3 mt-1 text-sm font-medium text-neutral-600 antialiased">
              Home
            </p>
          </Link>
          <Link
            to="/dashboard"
            className="flex cursor-pointer items-center rounded-md p-2 hover:bg-neutral-100"
          >
            <Icon
              icon="ic:round-dashboard"
              className="text-2xl text-neutral-600"
            />
            <p className="ml-3 mt-1 text-sm font-medium text-neutral-600 antialiased">
              Dashboard
            </p>
          </Link>
          <Link
            to="/reporting"
            className="flex cursor-pointer items-center rounded-md p-2 hover:bg-neutral-100"
          >
            <Icon
              icon="oui:app-reporting"
              className="text-2xl text-neutral-600"
            />
            <p className="ml-3 mt-1 text-sm font-medium text-neutral-600 antialiased">
              Reporting
            </p>
          </Link>
          {isAuthenticated && (
            <Link
              to="/settings"
              className="flex cursor-pointer items-center rounded-md p-2 hover:bg-neutral-100"
            >
              <Icon
                icon="ic:round-settings"
                className="text-2xl text-neutral-600"
              />
              <p className="ml-3 mt-1 text-sm font-medium text-neutral-600 antialiased">
                Settings
              </p>
            </Link>
          )}
        </nav>
      </div>
      <div className="mb-4">
        <Link
          to="/support"
          className="flex cursor-pointer items-center rounded-md p-2 hover:bg-neutral-100"
        >
          <Icon
            icon="mdi:customer-service"
            className="text-2xl text-neutral-600"
          />
          <p className="ml-3 mt-1 text-sm font-medium text-neutral-600 antialiased">
            Support
          </p>
        </Link>
        {isAuthenticated && (
          <form method="POST" action="/logout" className="p-2">
            <button>
              <div className="flex items-center">
                <Icon
                  icon="solar:logout-outline"
                  className="text-2xl text-red-600"
                />
                <p className="ml-3 text-sm font-medium text-red-600 antialiased">
                  Logout
                </p>
              </div>
            </button>
          </form>
        )}
      </div>
    </div>
    <div className="border-t pt-4">
      {isAuthenticated ? (
        <div className="flex w-full items-center gap-4">
          <Icon icon="ph:user" className="text-sm text-neutral-600" />
          <p className="text-sm font-medium text-neutral-600 antialiased">
            {name}
          </p>
        </div>
      ) : (
        <nav className="space-y-2">
          <Link
            to="/login"
            className="flex cursor-pointer items-center rounded-md p-2 hover:bg-neutral-100"
          >
            <Icon
              icon="ri:login-circle-fill"
              className="text-2xl text-neutral-600"
            />
            <p className="ml-3 mt-1 text-sm font-medium text-neutral-600 antialiased">
              Login / Create Account
            </p>
          </Link>
        </nav>
      )}
    </div>
  </div>
);

export default Navigation;
