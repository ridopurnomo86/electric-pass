export type EventDataType = {
  id: number;
  slug: string;
  name: string;
  description: string;
  country: string;
  created_at?: string;
  updated_at?: string;
  category_id?: number;
  type_id?: number;
  city: string;
  image_url: string;
  ended_date: string;
  start_date: string;
  EventCategory: {
    [key: string]: string;
  };
  EventType: {
    [key: string]: string;
  };
  Plan: never[];
};

const EVENT_DATA: EventDataType[] = [
  {
    id: 1,
    image_url: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&dpr=2&q=80",
    EventType: {
      name: "Workshop",
    },
    description: "",
    EventCategory: {
      name: "",
    },
    Plan: [],
    slug: "manufacture-ai",
    name: "Manufacture AI",
    city: "Philadelphia",
    country: "United States",
    start_date: "2026-06-14T12:28:34+07:00",
    ended_date: "2026-07-14T12:28:34+07:00",
  },
  {
    id: 2,
    image_url: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&dpr=2&q=80",
    EventType: {
      name: "Workshop",
    },
    description: "",
    EventCategory: {
      name: "",
    },
    Plan: [],
    slug: "manufacture-ai",
    name: "Manufacture AI",
    city: "Philadelphia",
    country: "United States",
    start_date: "2026-06-14T12:28:34+07:00",
    ended_date: "2026-07-14T12:28:34+07:00",
  },
  {
    id: 3,
    image_url: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&dpr=2&q=80",
    EventType: {
      name: "Workshop",
    },
    description: "",
    EventCategory: {
      name: "",
    },
    Plan: [],
    slug: "manufacture-ai",
    name: "Manufacture AI",
    city: "Philadelphia",
    country: "United States",
    start_date: "2026-06-14T12:28:34+07:00",
    ended_date: "2026-07-14T12:28:34+07:00",
  },
];

export default EVENT_DATA;
