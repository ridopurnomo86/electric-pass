import { useLoaderData, useNavigation } from "@remix-run/react";
import { FieldValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddEventValidation,
  AddEventValidationType,
} from "~/data/form-validation/AddEventValidation";
import EVENT_DATA from "~/data/test-data/event";
import { ProjectLoader } from "~/services/main/settings/projects";
import ProfileLayout from "../components/Layout";
import EventProjectList from "./EventProjectList";
import FormDialog from "./FormDialog";
import Header from "./Header";

const Projects = () => {
  const { type } = useLoaderData<typeof ProjectLoader>();
  const { state } = useNavigation();
  const form = useForm<AddEventValidationType>({
    resolver: zodResolver(AddEventValidation),
    defaultValues: {
      event_name: "",
      event_type: "",
      country: "",
      city: "",
      price: "",
      datetime: new Date(),
      description: "",
    },
  });

  const onSubmit = (values: FieldValue<AddEventValidationType>) => values;

  return (
    <ProfileLayout>
      <section>
        <div className="flex justify-between">
          <Header />
          <FormDialog form={form} isSubmit={state === "submitting"} onSubmit={onSubmit} />
        </div>
        <EventProjectList type={type} data={EVENT_DATA} />
      </section>
    </ProfileLayout>
  );
};

export default Projects;
