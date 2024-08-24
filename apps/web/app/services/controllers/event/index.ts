import { Prisma } from "@prisma/client";
import { json } from "@remix-run/node";
import { db } from "~/services/prisma.server";
import type { Event } from "@prisma/client";

const EventController = {
  addEvent: async ({ data }: { data: Event }) => {
    try {
      const createEvent = await db.event.create({
        data,
      });
      return createEvent;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        return json({
          status: "Error",
          type: "error",
          message: "Something gone wrong",
        });
      throw json(err);
    }
  },
};

export default EventController;
