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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import { MdOutlineUpdate } from "react-icons/md";

interface ResponseData {
  message: string;
  // Add other properties based on your API response
}

const ApplyForm = () => {
  const transferStepOneForm = z.object({
    PhoneNumber: z.string().min(2).max(10),
    Name: z.string().min(2).max(10),
    Email: z.string().min(2),
    Address: z
      .string()
      .min(3)
      .max(90000000 * 25),
  });

  const stepOneForm = useForm<z.infer<typeof transferStepOneForm>>({
    resolver: zodResolver(transferStepOneForm),
    defaultValues: {
      PhoneNumber: undefined,
      Address: undefined,
    },
  });

  const onSubmit = async (formData: z.infer<typeof transferStepOneForm>) => {
    console.log(formData);
    // mutate(formData);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzKRjPSmdDLd5UGbZK5bRnd9XsX4XhkRmcGZBCNEf5p/dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const data = response;
        console.log(data);
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Form {...stepOneForm}>
        <form
          className="card flex w-full flex-col gap-6  "
          onSubmit={stepOneForm.handleSubmit(onSubmit)}
        >
          <div className=" flex w-full flex-col gap-5 md:flex-row">
            <FormField
              control={stepOneForm.control}
              name="Name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col  justify-between gap-0">
                  <FormLabel className="font-normal">{` ${"Name"} `}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs text-secondary" />
                </FormItem>
              )}
            />
            <FormField
              control={stepOneForm.control}
              name="PhoneNumber"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col  justify-between gap-0">
                  <FormLabel className="font-normal">{` ${"Phone Number"} `}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs text-secondary" />
                </FormItem>
              )}
            />
          </div>
          <div className=" flex w-full flex-col gap-5 md:flex-row">
            <FormField
              control={stepOneForm.control}
              name="Email"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col  justify-between gap-0">
                  <FormLabel className="font-normal">{` ${"Email Address"} `}</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs text-secondary" />
                </FormItem>
              )}
            />
            <FormField
              control={stepOneForm.control}
              name="Address"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col  justify-between gap-0">
                  <FormLabel className="font-normal">{` ${"Address"} `}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
    </div>
  );
};

export default ApplyForm;
