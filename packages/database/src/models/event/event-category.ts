import { db } from "../..";

const EventCategoryModel = {
  getAllEventCategory: async () => {
    const categories = await db.eventCategory.findMany();

    return categories;
  },
  getEventCategory: async ({ categoryId }: { categoryId: number }) => {
    const category = await db.eventCategory.findFirst({
      where: {
        id: categoryId,
      },
    });

    return category;
  },
};

export default EventCategoryModel;
