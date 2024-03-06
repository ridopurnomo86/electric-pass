"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { Input } from "~/components/ui/Input";
import ProfileLayout from "./components/Layout";
import Mainlayout from "~/components/layout/MainLayout";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
});

const Profile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => values;

  return (
    <Mainlayout>
      <ProfileLayout>
        <section>
          <div className="mb-4 border-b-[1px] pb-4">
            <p className="text-xl font-semibold tracking-tight text-neutral-900">Profile</p>
            <p className="text-sm font-medium text-neutral-500">
              This is how others will see you on the site.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. It can be your real name or a pseudonym. You
                      can only change this once every 30 days.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="zed@email.com" type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can manage verified email addresses in your email settings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="text-neutral-200">
                Update Profile
              </Button>
            </form>
          </Form>
        </section>
      </ProfileLayout>
    </Mainlayout>
  );
};

export default Profile;
