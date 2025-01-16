import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ProjectLoader } from "services/main/settings/project";
import ProfileLayout from "../../components/Layout";
import EventProjectList from "./EventProjectList";
import Header from "./Header";

const Projects = () => {
  const { onGoingEvents, onFinishedEvents } = useLoaderData<typeof ProjectLoader>();

  const [typeProject, setTypeProject] = useState<"ongoing" | "finished">("ongoing");

  const data = typeProject === "ongoing" ? onGoingEvents : onFinishedEvents;

  return (
    <ProfileLayout resolve={onGoingEvents}>
      <section>
        <Header />
        <EventProjectList onTypeProject={setTypeProject} typeProject={typeProject} data={data} />
      </section>
    </ProfileLayout>
  );
};

export default Projects;
