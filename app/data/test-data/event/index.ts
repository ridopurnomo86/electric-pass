export type EventDataType = {
  id: number;
  imgUrl: string;
  type: string;
  title: string;
  location: string;
  datetime: string;
  price: number;
};

const EVENT_DATA: Array<EventDataType> = [
  {
    id: 1,
    imgUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&dpr=2&q=80",
    type: "Workshop",
    title: "Manufacture AI",
    location: "Philadelphia, United States",
    datetime: "2024-06-14T12:28:34+07:00",
    price: 30,
  },
  {
    id: 2,
    imgUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&dpr=2&q=80",
    type: "Workshop",
    title: "Manufacture AI",
    location: "Philadelphia, United States",
    datetime: "2024-06-14T12:28:34+07:00",
    price: 0,
  },
  {
    id: 3,
    imgUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&dpr=2&q=80",
    type: "Workshop",
    title: "Manufacture AI",
    location: "Philadelphia, United States",
    datetime: "2024-06-14T12:28:34+07:00",
    price: 60,
  },
];

export default EVENT_DATA;
