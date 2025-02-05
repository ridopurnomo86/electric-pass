import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { CreateEventValidation } from "~/data/form-validation/CreateEventValidation";
import { authenticator } from "services/auth.server";
import db from "@monorepo/database";
import Redis from "services/modules/redis";
import axios from "axios";
import { commitSession, getSession } from "services/session.server";
import { ValuesType } from "./types";

const EVENTS_CACHE = "events";

const uploadImageProject = async ({ formData }: { formData: FormData }) => {
  try {
    const post = await axios.post("/events/image/upload", formData, {
      baseURL: process.env.BACKEND_URL,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": process.env.API_KEY,
      },
    });

    return post;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorResponse = error.response?.data;
    if (errorResponse) return errorResponse;
  }
};

const SettingsCreateProjectAction = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = await authenticator.isAuthenticated(request);

  const checkingUser = await db.UserModel.getUser({
    id: Number(user?.id),
  });

  if (!checkingUser) throw json({ message: "Unauthorize" }, { status: 401 });

  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const validation = CreateEventValidation.parse({
    ...values,
    plans: JSON.parse(values.plans as string),
    user_id: Number(values.user_id),
  });

  if (!validation) return redirect(`/settings/project/create?message=form-error`);

  const uploadImage = await uploadImageProject({ formData });

  if (!uploadImage)
    return json({
      status: "Error",
      type: "error",
      message: "Something gone wrong while uploading image",
    });

  const createEvent = await db.EventModel.addEvent({
    data: validation as unknown as ValuesType,
    userId: Number(user?.id),
    imageUrl: uploadImage.data.data.url,
    plans: validation.plans,
  });

  if (!createEvent)
    return json({
      status: "Error",
      type: "error",
      message: "Something gone wrong when create project",
    });

  session.flash("create-event", {
    status: "Success",
    type: "success",
    message: "Event Has Created",
  });

  json({
    status: "Success",
    type: "success",
    message: "Event Has Created",
  });

  await Redis.deleteItem(EVENTS_CACHE);

  return redirect("/settings/project", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default SettingsCreateProjectAction;
