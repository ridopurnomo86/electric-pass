import { ActionFunctionArgs, json } from "@remix-run/node";
import { AccountProfileValidation } from "~/data/form-validation/AccountProfileValidation";
import { authenticator } from "services/auth.server";
import db from "@monorepo/database";
import { getSession } from "services/session.server";

const SettingsAccountAction = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  const session = await getSession(request.headers.get("Cookie"));
  const data = await request.json();

  const validation = AccountProfileValidation.parse({
    ...data,
  });

  if (!validation) return json({ validation });

  const updateUser = await db.UserModel.updateUser({
    id: Number(user?.id),
    data: {
      address: data.address,
      dialing_code: data.dialing_code,
      phone_number: data.phone_number,
      country: data.country,
      city: data.city,
    },
  });

  if (updateUser) {
    session.flash("update-profile", {
      status: "Success",
      type: "success",
      message: "Success updating profile",
    });

    return json({
      status: "Success",
      type: "success",
      message: "Success updating profile",
    });
  }

  return json({
    status: "Error",
    type: "error",
    message: "Something gone wrong",
  });
};

export default SettingsAccountAction;
