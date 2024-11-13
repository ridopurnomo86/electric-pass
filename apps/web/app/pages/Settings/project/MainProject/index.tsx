import { useLoaderData } from "@remix-run/react";
import EVENT_DATA from "~/data/test-data/event";
import { ProjectLoader } from "services/main/settings/project";
import ProfileLayout from "../../components/Layout";
import EventProjectList from "./EventProjectList";
import Header from "./Header";

const Projects = () => {
  const { type } = useLoaderData<typeof ProjectLoader>();

  return (
    <ProfileLayout>
      <section>
        <Header />
        <EventProjectList type={type} data={EVENT_DATA} />
      </section>
    </ProfileLayout>
  );
};

export default Projects;
