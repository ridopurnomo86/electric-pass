import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation, LoginValidationType } from "~/data/form-validation/LoginValidation";
import Thumbnail from "./Thumbnail";
import FormInput from "./FormInput";
import { useLoaderData } from "@remix-run/react";
import { useToast } from "~/components/ui/Toaster/useToast";
import { useEffect } from "react";

const Login = () => {
  const { toast } = useToast();
  const { message } = useLoaderData<{
    message: { message: string; type: string; status: string };
  }>();
  const form = useForm<LoginValidationType>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (message?.type === "success") {
      toast({
        title: message.status,
        description: message.message,
        variant: "default",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const onSubmit = (values: LoginValidationType) => values;

  return (
    <main className="min-h-screen w-full overflow-hidden">
      <section className="relative flex">
        <FormInput form={form} onSubmit={onSubmit} />
        <Thumbnail />
      </section>
    </main>
  );
};

export default Login;
