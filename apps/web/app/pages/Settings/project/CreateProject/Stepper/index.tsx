import { Icon } from "@iconify/react";
import cn from "~/modules/cn";

type StepperPropsType = {
  steps: {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    isPassed?: boolean;
  }[];
};

const Stepper = ({ steps = [] }: StepperPropsType) => (
  <ul className="relative mb-4 flex flex-col gap-2 border-b py-4 md:flex-row">
    {steps.map((item, idx) => (
      <li key={item.id} className="group flex flex-1 gap-x-2 md:block md:shrink md:basis-0">
        <div className="flex min-h-7 min-w-7 flex-col items-center align-middle text-xs md:inline-flex md:w-full md:flex-row md:flex-wrap">
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-800",
              item.isActive ? "bg-blue-600 text-white" : "bg-gray-100"
            )}
          >
            {item.isPassed ? <Icon icon="mingcute:check-fill" /> : idx + 1}
          </span>
          <div className="mt-2 h-full w-px bg-gray-200 group-last:hidden md:ms-2 md:mt-0 md:h-px md:w-full md:flex-1"></div>
        </div>
        <div className="grow pb-5 md:mt-3 md:grow-0 md:pb-0">
          <span className="block text-sm font-medium text-gray-800">{item.title}</span>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
      </li>
    ))}
  </ul>
);

export default Stepper;
