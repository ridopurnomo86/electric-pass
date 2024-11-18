import { useLoaderData } from "@remix-run/react";
import { ProjectLoader } from "services/main/settings/project";
import ProfileLayout from "../../components/Layout";
import EventProjectList from "./EventProjectList";
import Header from "./Header";

const Projects = () => {
  const { type, events } = useLoaderData<typeof ProjectLoader>();

  return (
    <ProfileLayout resolve={events}>
      <section>
        <Header />
        <EventProjectList type={type} data={events} />
      </section>
    </ProfileLayout>
  );
};

export default Projects;
