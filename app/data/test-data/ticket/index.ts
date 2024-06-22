export type TicketDataType = {
  id: number;
  description: string;
  title: string;
  price: number;
  expiredDate: string;
  stock: number;
};

const TICKET_DATA: Array<TicketDataType> = [
  {
    id: 1,
    title: "Premium",
    description: `Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging
    on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.`,
    price: 300,
    expiredDate: "2024-04-20T14:31:37+07:00",
    stock: 30,
  },
  {
    id: 2,
    title: "VIP",
    description: `Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging
    on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.`,
    price: 500,
    expiredDate: "2024-04-20T14:31:37+07:00",
    stock: 0,
  },
  {
    id: 2,
    title: "VIP",
    description: `Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging
    on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.`,
    price: 500,
    expiredDate: "2025-04-20T14:31:37+07:00",
    stock: 30,
  },
];

export default TICKET_DATA;
