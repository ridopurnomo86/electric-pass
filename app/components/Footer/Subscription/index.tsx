import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/Form";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { SubscriptionValidationType } from "~/data/form-validation/SubscriptionValidation";
import { UseFormReturn } from "react-hook-form";

type SubscriptionPropsType = {
  form: UseFormReturn<SubscriptionValidationType>;
  onSubmit: (values: SubscriptionValidationType) => void;
};

const Subscription = ({ onSubmit, form }: SubscriptionPropsType) => (
  <section className="container mx-auto mt-8 flex items-center justify-between border-y-[1px] py-8 max-[999px]:flex-col max-[999px]:items-start">
    <div className="max-[999px]:mb-4">
      <p className="text-base font-medium text-neutral-900 antialiased">
        Subscribe to our newsletter
      </p>
      <p className="text-sm font-medium text-neutral-600 antialiased">
        The latest news, articles, and resources, sent to your inbox weekly.
      </p>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
        <div className="flex size-full items-center gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[300px] max-[999px]:w-auto">
                <FormControl>
                  <Input
                    type="email"
                    className="px-4 py-6"
                    placeholder="Enter Your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="px-8 py-6 text-neutral-200">
            Subscribe
          </Button>
        </div>
      </form>
    </Form>
  </section>
);

export default Subscription;
