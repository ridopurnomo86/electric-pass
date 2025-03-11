import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation, LoginValidationType } from "~/data/form-validation/LoginValidation";
import { useActionData, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { useToast } from "~/components/ui/Toaster/useToast";
import { useAuthenticityToken } from "remix-utils/csrf/react";
import useHttpRequest from "~/hooks/useHttpRequest";
import { useEffect } from "react";
import FormInput from "./FormInput";
import Thumbnail from "./Thumbnail";

const Login = () => {
  const csrf = useAuthenticityToken();
  const actionData = useActionData<{
    message: string;
    type: string;
    status: string;
  }>();
  const { state } = useNavigation();
  const submit = useSubmit();
  const { toast } = useToast();
  const loader =
    useLoaderData<{
      message: { message: string; type: string; status: string };
    }>() || {};
  const form = useForm<LoginValidationType>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { request, isLoading } = useHttpRequest({
    path: "/auth/email",
    method: "POST",
  });

  useEffect(() => {
    if (loader?.message) {
      toast({
        title: loader?.message.status,
        description: loader?.message.message,
        variant: loader?.message.type === "success" ? "default" : "destructive",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loader]);

  const onSubmit = async (values: LoginValidationType) => {
    const { data, error } = await request({
      body: {
        email: values.email,
        password: values.password,
      },
    });

    if (data) return submit({ ...data.data, csrf }, { method: "post" });

    form.resetField("password");

    if (!data || error) {
      const { message } = error.response.data;

      return toast({
        title: "Warning",
        description: message,
        variant: "destructive",
      });
    }

    return toast({
      title: "Warning",
      description: "Something gone wrong",
      variant: "destructive",
    });
  };

  return (
    <main className="min-h-screen w-full overflow-hidden">
      <section className="relative flex">
        <FormInput
          form={form}
          onSubmit={onSubmit}
          isSubmit={state === "submitting" || isLoading}
          actionData={actionData}
          state={state}
        />
        <Thumbnail />
      </section>
    </main>
  );
};

export default Login;
