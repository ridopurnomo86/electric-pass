import TabsNavigation from "~/components/core/TabsNavigation";

type StepType = "ticket" | "billing" | "summary";

type StepperPropsType = {
  step: StepType;
  onStep: (value: StepType) => void;
};

const Stepper = ({ step, onStep }: StepperPropsType) => (
  <TabsNavigation
    className="bg-[#F8FAFC] px-4 md:px-10"
    heightSize={6}
    isUseIndex
    tabs={[
      {
        id: "description",
        label: "Ticket",
        isActive: step === "ticket",
        onClick: () => onStep("ticket"),
        isDisabled: step !== "ticket",
      },
      {
        id: "ticket",
        isActive: step === "billing",
        label: "Billing Information",
        onClick: () => onStep("billing"),
        isDisabled: step !== "billing",
      },
      {
        id: "summary",
        isActive: step === "summary",
        label: "Summary",
        onClick: () => onStep("summary"),
        isDisabled: step !== "summary",
      },
    ]}
  />
);

export default Stepper;
