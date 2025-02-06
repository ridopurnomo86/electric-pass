import { UseFormReturn } from "react-hook-form";
import GradientText from "~/components/core/GradientText";
import { Button } from "~/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/Form";
import { Input } from "~/components/ui/Input";
import { HomeSearchValidationType } from "~/data/form-validation/HomeSearchValidation";

type HeroPropsType = {
  form: UseFormReturn<HomeSearchValidationType>;
  onSubmit: (values: HomeSearchValidationType) => void;
};

const Hero = ({ onSubmit, form }: HeroPropsType) => (
  <section className="bg-white">
    <div className="container mx-auto bg-white py-24">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={5}
        showBorder={false}
      >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Find Your Next Event
        </h1>
      </GradientText>

      <p className="mt-1 text-neutral-600">
        Enter your criteria and discover events that match your preferences.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <div className="flex size-full items-center gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="max-w-[50%]">
                  <FormControl>
                    <Input className="px-4 py-6" placeholder="Jakarta, Indonesia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="px-8 py-6 text-neutral-200">
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  </section>
);

export default Hero;
