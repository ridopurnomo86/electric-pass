import { useLoaderData } from "@remix-run/react";
import { SettingsCreateProjectLoader } from "~/services/main/settings/project/create-project";
import { useRef, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import ProfileLayout from "../../components/Layout";
import Header from "./Header";
import AboutForm from "./form/About";
import Description from "./form/Description";
import Stepper from "./Stepper";

export type StepType = "description" | "about";

const CreateProject = () => {
  const currentDataRef = useRef();
  const [step, setStep] = useState<StepType>("about");

  const loaderData = useLoaderData<typeof SettingsCreateProjectLoader>();

  const category = loaderData.category.map((item: { name: string }) => ({
    value: item.name,
    label: item.name,
  }));

  return (
    <ProfileLayout>
      <section>
        <Header />
        <Stepper
          steps={[
            {
              id: "about",
              title: "About",
              description: "This is description text.",
              isActive: step === "about",
            },
            {
              id: "description",
              title: "Description",
              description: "This is description text.",
              isActive: step === "description",
            },
          ]}
        />
        <ClientOnly fallback={<p>Loading...</p>}>
          {() =>
            step === "about" ? (
              <AboutForm currentData={currentDataRef} onStep={setStep} category={category} />
            ) : (
              <Description />
            )
          }
        </ClientOnly>
      </section>
    </ProfileLayout>
  );
};
export default CreateProject;
