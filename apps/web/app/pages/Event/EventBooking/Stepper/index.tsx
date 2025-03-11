import TabsNavigation from "~/components/core/TabsNavigation";

type StepType = "ticket" | "billing" | "confirmation";

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
        id: "confirmation",
        isActive: step === "confirmation",
        label: "Confirmation",
        onClick: () => onStep("confirmation"),
        isDisabled: step !== "confirmation",
      },
    ]}
  />
);

export default Stepper;
