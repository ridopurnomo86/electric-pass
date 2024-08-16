import { LoaderFunction, defer } from "@remix-run/node";
import { db } from "~/services/prisma.server";

const MainHomeLoader: LoaderFunction = async () => {
  const category = await db.eventType.findMany();

  return defer({ category });
};

export default MainHomeLoader;
