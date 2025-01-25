import { db } from "../..";

const EventTypeModel = {
  getAllEventType: async () => {
    const types = await db.eventType.findMany();

    return types;
  },
  getEventType: async ({ typeId }: { typeId: number }) => {
    const type = await db.eventCategory.findFirst({
      where: {
        id: typeId,
      },
    });

    return type;
  },
};

export default EventTypeModel;
