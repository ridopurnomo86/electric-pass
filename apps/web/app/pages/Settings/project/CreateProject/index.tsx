import { useActionData, useLoaderData } from "@remix-run/react";
import { SettingsCreateProjectLoader } from "services/main/settings/project/create-project";
import { useToast } from "~/components/ui/Toaster/useToast";
import { useEffect, useRef, useState } from "react";
import ProfileLayout from "../../components/Layout";
import Header from "./Header";
import Form from "./form";

export type StepType = "about" | "description" | "ticket";

export type CurrentDataRefType = {
  event_name: string;
  topic_type: string;
  event_type: number;
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
  const { toast } = useToast();

  const currentDataRef = useRef<CurrentDataRefType>({} as CurrentDataRefType);

  const [step, setStep] = useState<StepType>("about");

  const loaderData = useLoaderData<typeof SettingsCreateProjectLoader>();

  const actionData = useActionData<{
    message: string;
    type: string;
    status: string;
  }>();

  const type = loaderData.type.map((item: { name: string; id: number }) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    if (actionData) {
      toast({
        title: actionData.status,
        description: actionData.message,
        variant: actionData.type === "success" ? "default" : "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <ProfileLayout resolve={type}>
      <section>
        <Header step={step} />
        <Form eventTypes={type} currentData={currentDataRef} onStep={setStep} step={step} />
      </section>
    </ProfileLayout>
  );
};
export default CreateProject;
