"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";

const NewsLetterForm = () => {
  const transferStepOneForm = z.object({
    email: z.string().min(2).max(10),
  });

  const stepOneForm = useForm<z.infer<typeof transferStepOneForm>>({
    resolver: zodResolver(transferStepOneForm),
    defaultValues: {
      email: undefined,
    },
  });

  const onSubmit = (formData: z.infer<typeof transferStepOneForm>) => {
    console.log(formData);
    // mutate(formData);
  };
  return (
    <Form {...stepOneForm}>
      <form
        className="card flex w-full flex-col gap-6 border border-base-300 p-8 backdrop-blur-md  "
        onSubmit={stepOneForm.handleSubmit(onSubmit)}
      >
        <div className=" flex w-full flex-col gap-5 md:flex-row">
          <FormField
            control={stepOneForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col  justify-between gap-0">
                <FormLabel className="font-normal">{` ${"Email"} `}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="enter your email (example@email.com)"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-xs text-secondary" />
              </FormItem>
            )}
          />
        </div>

        <button
          className=" btn rounded-full bg-primary text-white hover:bg-primary-content"
          // type={isLoading ? "button" : "submit"}
        >
          {false ? <BeatLoader size={10} /> : <>Apply Now</>}
        </button>
      </form>
    </Form>
  );
};
export default NewsLetterForm;
