import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HomeSearchValidation } from "~/data/form-validation/HomeSearchValidation";
import Hero from "./Hero";
import EventCardList from "~/components/data-display/EventCardList";
import CreatorCardList from "~/components/data-display/CreatorCardList";
import CategoryCardList from "~/components/data-display/CategoryCardList";

const DATA = [
  {
    id: 1,
    imgUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&dpr=2&q=80",
    type: "Workshop",
    title: "Manufacture AI",
    location: "Philadelphia, United States",
    startDate: "20 Dec - 23 Dec",
    startTime: "5:00 PM - 10:00 PM",
  },
  {
    id: 2,
    imgUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&dpr=2&q=80",
    type: "Workshop",
    title: "Manufacture AI",
    location: "Philadelphia, United States",
    startDate: "20 Dec - 23 Dec",
    startTime: "5:00 PM - 10:00 PM",
  },
  {
    id: 3,
    imgUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&dpr=2&q=80",
    type: "Workshop",
    title: "Manufacture AI",
    location: "Philadelphia, United States",
    startDate: "20 Dec - 23 Dec",
    startTime: "5:00 PM - 10:00 PM",
  },
];

const CREATOR_DATA = [
  {
    id: 1,
    title: "Global Education",
    imgUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&dpr=2&q=80",
  },
  {
    id: 2,
    title: "Tommorowland",
    imgUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&dpr=2&q=80",
  },
];

const CATEGORY_DATA = [
  {
    id: 1,
    title: "Workshop",
    icon: "mdi:education-outline",
    totalEvent: 10,
    navigateTo: "#",
  },
  {
    id: 2,
    title: "Concert",
    icon: "akar-icons:music-album-fill",
    totalEvent: 10,
    navigateTo: "#",
  },
  {
    id: 3,
    title: "Conference",
    icon: "material-symbols:forum-rounded",
    totalEvent: 10,
    navigateTo: "#",
  },
  {
    id: 4,
    title: "Festival",
    icon: "material-symbols:festival-rounded",
    totalEvent: 10,
    navigateTo: "#",
  },
];

const MainHome = () => {
  const form = useForm<z.infer<typeof HomeSearchValidation>>({
    resolver: zodResolver(HomeSearchValidation),
    defaultValues: {
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof HomeSearchValidation>) => values;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Hero form={form} onSubmit={onSubmit} />
      <EventCardList
        data={DATA}
        className="container mx-auto mt-12"
        subtitle="Top picks for you. Updated Daily"
        title="Selected Events"
      />
      <CreatorCardList
        title="Featured Creators"
        subtitle="Follow the creator from these events and get notified when they create new ones."
        data={CREATOR_DATA}
      />
      <CategoryCardList title="Category Events" data={CATEGORY_DATA} />
      <EventCardList
        data={DATA}
        className="container mx-auto mt-12 pb-12"
        subtitle="Top picks for your country"
        title="Popular in Medan, Indonesia"
      />
    </main>
  );
};

export default MainHome;
