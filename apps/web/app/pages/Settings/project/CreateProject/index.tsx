import { useLoaderData } from "@remix-run/react";
import { SettingsCreateProjectLoader } from "services/main/settings/project/create-project";
import { useRef, useState } from "react";
import ProfileLayout from "../../components/Layout";
import Header from "./Header";
import Form from "./form";

export type StepType = "about" | "description" | "ticket";

export type CurrentDataRefType = {
  event_name: string;
  topic_type: string;
  category_type: number;
  start_date: string;
  ended_date: string;
  duration: string;
  country: string;
  city: string;
  time: string;
  description: string;
  image: File;
  plans: {
    pricing_name: string;
    description: string;
    price: string;
  }[];
};

const CreateProject = () => {
  const currentDataRef = useRef<CurrentDataRefType>({} as CurrentDataRefType);

  const [step, setStep] = useState<StepType>("about");

  const loaderData = useLoaderData<typeof SettingsCreateProjectLoader>();

  const category = loaderData.category.map((item: { name: string; id: number }) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <ProfileLayout>
      <section>
        <Header step={step} />
        <Form category={category} currentData={currentDataRef} onStep={setStep} step={step} />
      </section>
    </ProfileLayout>
  );
};
export default CreateProject;
