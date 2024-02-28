import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation, LoginValidationType } from "~/data/form-validation/LoginValidation";
import Thumbnail from "./Thumbnail";
import FormInput from "./FormInput";

const Login = () => {
  const form = useForm<LoginValidationType>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: LoginValidationType) => values;

  return (
    <main className="min-h-screen w-full overflow-hidden">
      <section className="flex relative">
        <FormInput form={form} onSubmit={onSubmit} />
        <Thumbnail />
      </section>
    </main>
  );
};

export default Login;
