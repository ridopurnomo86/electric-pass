import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/Button";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto flex size-full min-h-screen max-w-none flex-col items-center justify-center gap-4 py-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          className="size-16 flex-none rounded-full object-cover"
          src="https://res.cloudinary.com/subframe/image/upload/v1723777918/uploads/302/udfgpsjpnbdrvmk0y7r4.png"
          alt="error"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-xl font-semibold antialiased">404 | Page not found</span>
          <span className="text-base font-medium text-neutral-600 antialiased">
            We couldn&#39;t find what you were looking for.
          </span>
        </div>
        <Button variant="secondary" onClick={() => navigate("/", { replace: true })}>
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default Error;
