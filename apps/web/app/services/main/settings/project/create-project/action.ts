import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import {
  CreateEventValidation,
  CreateEventValidationType,
} from "~/data/form-validation/CreateEventValidation";
import { authenticator } from "~/services/auth.server";
import { getSession } from "~/services/session.server";

const SettingsCreateProjectAction = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  const session = await getSession(request.headers.get("Cookie"));

  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<CreateEventValidationType>(
    request,
    zodResolver(CreateEventValidation)
  );

  if (errors) return json({ errors, defaultValues });

  return null;
};

export default SettingsCreateProjectAction;
