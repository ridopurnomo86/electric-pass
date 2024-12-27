import { ClientOnly } from "remix-utils/client-only";
import { MutableRefObject } from "react";
import { CurrentDataRefType, StepType } from "..";
import AboutForm from "./About";
import DescriptionForm from "./Description";
import TicketForm from "./Ticket";
import CreateProjectLoading from "./loading";

type CreateProjectForm = {
  currentData: MutableRefObject<CurrentDataRefType>;
  onStep: (step: StepType) => void;
  eventTypes: { value: string; label: string }[];
  step: StepType;
};

const Form = ({ currentData, onStep, eventTypes, step }: CreateProjectForm) => {
  const renderComponent = () => {
    switch (step) {
      case "about":
        return <AboutForm currentData={currentData} onStep={onStep} eventTypes={eventTypes} />;
      case "description":
        return <DescriptionForm currentData={currentData} onStep={onStep} />;
      case "ticket":
        return <TicketForm currentData={currentData} />;
    }
  };

  return <ClientOnly fallback={<CreateProjectLoading />}>{() => renderComponent()}</ClientOnly>;
};

export default Form;
