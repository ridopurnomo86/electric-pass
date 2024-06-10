import { Link, useSearchParams } from "@remix-run/react";
import ProfileLayout from "../components/Layout";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "~/components/ui/NavigationMenu";
import { Toggle } from "~/components/ui/Toggle";
import EventCard from "~/components/cards/EventCard";

const Projects = () => {
  const [searchParams] = useSearchParams();

  const DATA = {
    id: 2,
    imgUrl: "https://images.unsplash.com/photo-1496047160831-9aa3ac415852?w=800&dpr=2&q=80",
    type: "Workshop",
    title: "Manufacture AI",
    location: "Philadelphia, United States",
    startDate: "20 Dec - 23 Dec",
    startTime: "5:00 PM - 10:00 PM",
  };

  return (
    <ProfileLayout>
      <section>
        <div className="mb-4 border-b-[1px] pb-4">
          <p className="text-xl font-semibold tracking-tight text-neutral-900">Projects</p>
          <p className="text-sm font-medium text-neutral-500">Some of projects.</p>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <Link to="/settings/projects?type=ongoing" prefetch="intent">
                <Toggle
                  defaultPressed={searchParams.get("type") === "ongoing"}
                  className="px-4 py-1 text-base font-medium text-neutral-700 antialiased transition-all hover:opacity-70"
                >
                  Ongoing
                </Toggle>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/settings/projects?type=finished" prefetch="intent">
                <Toggle
                  defaultPressed={searchParams.get("type") === "finished"}
                  className="px-4 py-1 text-base font-medium text-neutral-700 antialiased transition-all hover:opacity-70"
                >
                  Finished
                </Toggle>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="mt-4 grid auto-cols-[minmax(0,_2fr)] grid-flow-col gap-4">
          <EventCard {...DATA} />
          <EventCard {...DATA} />
        </div>
      </section>
    </ProfileLayout>
  );
};

export default Projects;
