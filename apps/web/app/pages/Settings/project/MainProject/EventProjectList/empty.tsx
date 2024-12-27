import { Icon } from "@iconify/react";

const EventProjectListEmpty = () => (
  <div className="mt-4 flex h-[40vh] flex-col items-center justify-center">
    <div className="mb-2 rounded-md border-2 p-2">
      <Icon icon="si:projects-alt-line" className="text-4xl text-neutral-600" />
    </div>
    <p className="mb-2 text-lg font-semibold tracking-tight text-neutral-900">No project found.</p>
    <p className="text-center text-sm text-neutral-500">
      We couldn&apos;t find your project, <br></br>Please try again or create a new project.
    </p>
  </div>
);

export default EventProjectListEmpty;
