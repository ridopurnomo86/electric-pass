import EventCategoryDataType from "../event-category";
import EventTypeDataType from "../event-type";
import EventPlanDataType from "../plans";
import UserOrganizerDataType from "../user-organizer";

type EventDataType = {
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
  EventCategory: EventCategoryDataType;
  EventType: EventTypeDataType;
  Plan: EventPlanDataType[];
  User: UserOrganizerDataType;
};

export default EventDataType;
