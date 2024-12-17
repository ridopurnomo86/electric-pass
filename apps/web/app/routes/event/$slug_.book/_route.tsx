import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { EventBookingLoader, EventBookingAction } from "services/main/event/event-booking";
import Mainlayout from "~/components/layout/MainLayout";
import EventBookingPage from "~/pages/Event/EventBooking";

export const meta: MetaFunction = () => [{ title: "Booking" }];

export const action = async (params: ActionFunctionArgs) => await EventBookingAction(params);

export const loader = async (params: LoaderFunctionArgs) => await EventBookingLoader(params);

const EventBooking = () => (
  <Mainlayout hasHideNavigation>
    <EventBookingPage />
  </Mainlayout>
);

export default EventBooking;
