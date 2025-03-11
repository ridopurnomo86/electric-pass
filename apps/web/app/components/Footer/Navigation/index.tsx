import { Link } from "@remix-run/react";
import Logo from "~/assets/electric-pass-logo.svg";

const Navigation = () => (
  <section className="container mx-auto flex items-start justify-between space-x-16 pb-4 max-[999px]:flex-col max-[999px]:items-start max-[999px]:space-x-0">
    <div>
      <div className="w-full">
        <img src={Logo} alt="electric-pass-logo" className="w-[200px]" />
      </div>
      <p className="mt-4 text-sm font-medium text-neutral-600 antialiased">
        &copy;2024 Electric Pass, Inc. All rights reserved.
      </p>
    </div>
    <div className="flex flex-wrap gap-20 max-[999px]:mt-8">
      <div className="space-y-2">
        <p className="text-base font-semibold text-neutral-900 antialiased">
          <Link to="#">Solutions</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">Marketing</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">Analytics</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">Insights</Link>
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-base font-semibold text-neutral-900 antialiased">
          <Link to="#">Company</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">About</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">Blog</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">Partners</Link>
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-base font-semibold text-neutral-900 antialiased">
          <Link to="#">Support</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">Pricing</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">Documentation</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">Guides</Link>
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-base font-semibold text-neutral-900 antialiased">
          <Link to="#">Legal</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">Terms</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">Privacy</Link>
        </p>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          <Link to="#">Claim</Link>
        </p>
      </div>
    </div>
  </section>
);

export default Navigation;
