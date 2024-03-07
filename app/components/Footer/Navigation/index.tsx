import Logo from "~/assets/elastic-pass-logo.svg";

const Navigation = () => (
  <section className="container mx-auto flex items-start justify-between space-x-16 pb-4 max-[999px]:flex-col max-[999px]:items-start max-[999px]:space-x-0">
    <div>
      <div className="w-full">
        <img src={Logo} alt="elastic-pass-logo" className="w-[200px]" />
      </div>
      <p className="mt-4 text-sm font-medium text-neutral-600 antialiased">
        &copy;2024 Elastic Pass, Inc. All rights reserved.
      </p>
    </div>
    <div className="flex flex-wrap gap-20 max-[999px]:mt-8">
      <div className="space-y-2">
        <p className="text-base font-semibold text-neutral-900 antialiased">Solutions</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">Marketing</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">Analytics</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">Insights</p>
      </div>
      <div className="space-y-2">
        <p className="text-base font-semibold text-neutral-900 antialiased">Company</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">About</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">Blog</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">Partners</p>
      </div>
      <div className="space-y-2">
        <p className="text-base font-semibold text-neutral-900 antialiased">Support</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">Pricing</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">Documentation</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">Guides</p>
      </div>
      <div className="space-y-2">
        <p className="text-base font-semibold text-neutral-900 antialiased">Legal</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">Terms</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">Privacy</p>
        <p className="text-sm font-medium text-neutral-600 antialiased">Claim</p>
      </div>
    </div>
  </section>
);

export default Navigation;
