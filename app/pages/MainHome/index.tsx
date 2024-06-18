import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HomeSearchValidation } from "~/data/form-validation/HomeSearchValidation";
import EventCardList from "~/components/data-display/EventCardList";
import CreatorCardList from "~/components/data-display/CreatorCardList";
import CategoryCardList from "~/components/data-display/CategoryCardList";
import EVENT_DATA from "~/data/test-data/event";
import ORGANIZER_DATA from "~/data/test-data/organizer";
import CATEGORY_DATA from "~/data/test-data/category";
import Hero from "./Hero";

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
        data={EVENT_DATA}
        className="container mx-auto mt-12"
        subtitle="Top picks for you. Updated Daily"
        title="Selected Events"
      />
      <CategoryCardList title="Category Events" data={CATEGORY_DATA} />
      <CreatorCardList
        title="Featured Artists & Organizers"
        subtitle="Follow the creator from these events and get notified when they create new ones."
        data={ORGANIZER_DATA}
      />
      <EventCardList
        data={EVENT_DATA}
        className="container mx-auto mt-12 pb-12"
        subtitle="Top picks for your country"
        title="Popular in Medan, Indonesia"
      />
    </main>
  );
};

export default MainHome;
