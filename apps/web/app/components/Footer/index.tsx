import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubscriptionValidation } from "~/data/form-validation/SubscriptionValidation";
import { z } from "zod";
import Navigation from "./Navigation";
import Copyright from "./Copyright";
import Subscription from "./Subscription";

const Footer = () => {
  const form = useForm<z.infer<typeof SubscriptionValidation>>({
    resolver: zodResolver(SubscriptionValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SubscriptionValidation>) => values;

  return (
    <footer className="bg-[#F8FAFC] py-12">
      <Navigation />
      <Subscription form={form} onSubmit={onSubmit} />
      <Copyright />
    </footer>
  );
};

export default Footer;
