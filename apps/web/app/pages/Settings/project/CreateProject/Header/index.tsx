import Stepper from "./Stepper";

type HeaderPropsType = {
  step: "about" | "description" | "ticket";
};

const Header = ({ step }: HeaderPropsType) => (
  <>
    <div className="mb-4 border-b pb-4">
      <p className="text-xl font-semibold tracking-tight text-neutral-900">Create Event Project</p>
      <p className="text-sm font-medium text-neutral-500">Please enter detail of event.</p>
    </div>
    <Stepper
      steps={[
        {
          id: "about",
          title: "About",
          description: "About Information Event.",
          isActive: step === "about",
        },
        {
          id: "description",
          title: "Description",
          description: "Description Event.",
          isActive: step === "description",
        },
        {
          id: "ticket",
          title: "Ticket",
          description: "Pricing Event.",
          isActive: step === "ticket",
        },
      ]}
    />
  </>
);

export default Header;
