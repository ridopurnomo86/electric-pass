export type ValuesType = {
  event_name: string;
  topic_type: string;
  category_type: number;
  start_date: Date;
  ended_date: Date;
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
