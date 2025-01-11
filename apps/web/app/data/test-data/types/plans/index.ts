type EventPlanDataType = {
  id: number;
  description: string;
  name: string;
  price: string;
  event_id: number;
  amount: number;
  updated_at: string;
  created_at: string;
  ended_date: string;
  order?: {
    total_order?: number;
    total_price?: number;
  };
};

export default EventPlanDataType;
