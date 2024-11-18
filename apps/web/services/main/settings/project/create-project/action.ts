import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { CreateEventValidation } from "~/data/form-validation/CreateEventValidation";
import { authenticator } from "services/auth.server";
import EventModel from "services/models/event";
import axios from "axios";
import { getSession } from "services/session.server";
import UserModel from "services/models/user";
import { ValuesType } from "./types";

const uploadImageProject = async ({ formData }: { formData: FormData }) => {
  try {
    const post = await axios.post("/events/image/upload", formData, {
      baseURL: process.env.BACKEND_URL,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${process.env.API_KEY}`,
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

  const checkingUser = await UserModel.getUser({
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

  const createEvent = await EventModel.addEvent({
    data: validation as unknown as ValuesType,
    userId: Number(user?.id),
    imageUrl: uploadImage.data.data.url,
    plans: validation.plans,
  });

  if (createEvent) {
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
  }
};

export default SettingsCreateProjectAction;
