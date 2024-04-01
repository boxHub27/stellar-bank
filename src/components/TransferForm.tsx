"use client";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SendFundsForm = () => {
  const [formData, setFormData] = useState({
    // name: "",
    // amount: "",
    // accountToSendFrom: "",
    // accountNumber: "",
    // routingNumber: "",
    // pin: "",
    step: 1,
  });

  const transferStepOneForm = z.object({
    receiverName: z.string().min(2).max(50),
    receiverAccountNumber: z
      .string()
      .min(3)
      .max(90000000 * 25),
    receiverRoutingNumber: z
      .string()
      .min(3)
      .max(90000000 * 25),
  });

  const stepOneForm = useForm<z.infer<typeof transferStepOneForm>>({
    resolver: zodResolver(transferStepOneForm),
  });

  const formSchema = z.object({
    // receiverName: z.string().min(2).max(50),
    receiverBank: z.string().min(3).max(50),
    // transactionAccount: z.string(),
    // transactionAccountId: z.string(),
    // transactionStatus: z.string().min(3),
    pin: z.string(),
    amount: z.string(),
    // transactionType: z.string().min(3).max(50),
    // transactionDate: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   receiverName: "",
    //   receiverBank: "",
    //   amount: "",
    //   transactionAccountId: "",
    //   transactionAccount: "Checkings",
    //   transactionStatus: "Completed",
    //   transactionType: transactionType,
    //   receiverAccountNumber: generateRandomNumber(),
    //   receiverRoutingNumber: generateRandomNumber(),
    //   transactionDate: new Date(),
    // },
  });

  const handleSubmitForm = (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      ...stepOneForm.getValues(),
    };
    console.log(data);

    // if (data.pin == "3224") {
    //   return <div>{data.pin}</div>;
    // }
  };
  const handleSubmitFormOne = (values: z.infer<typeof transferStepOneForm>) => {
    // e.preventDefault();
    if (formData.step === 1) {
      setFormData((prevData) => ({ ...prevData, step: 2 }));
    } else {
      // Handle final form submission logic here
      console.log(values);
      // Reset form after submission
      setFormData({
        // name: "",
        // amount: "",
        // accountToSendFrom: "",
        // accountNumber: "",
        // routingNumber: "",
        // pin: "",
        step: 1,
      });
    }
  };

  return (
    <div
      className="flex w-full flex-col gap-2 dark:text-white"
      // onSubmit={stepOneForm.handleSubmit(handleSubmitForm1)}
    >
      {formData.step === 1 && (
        <Form {...stepOneForm}>
          <form onSubmit={stepOneForm.handleSubmit(handleSubmitFormOne)}>
            <>
              <FormField
                control={stepOneForm.control}
                name="receiverName"
                render={({ field }) => (
                  <FormItem className="flex flex-col  justify-between gap-1">
                    <FormLabel className="font-normal">{` ${"Name"} `}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={stepOneForm.control}
                name="receiverAccountNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col  justify-between gap-1">
                    <FormLabel className="font-normal">{` ${"Account Number"} `}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={stepOneForm.control}
                name="receiverRoutingNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col  justify-between gap-2">
                    <FormLabel className=" font-normal">{` ${"Routing Number"} `}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="mt-12 rounded-full bg-secondary hover:bg-secondary-focus"
                type="submit"
                // onClick={() =>
                //   setFormData((prevData) => ({ ...prevData, step: 2 }))
                // }
              >
                Next
              </Button>
            </>
          </form>
        </Form>
      )}
      {formData.step === 2 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            <>
              <FormField
                control={form.control}
                name="receiverBank"
                render={({ field }) => (
                  <FormItem className="flex flex-col  justify-between gap-1">
                    <FormLabel className="font-normal">{` ${"Bank Name"} `}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex flex-col  justify-between gap-1">
                    <FormLabel className="font-normal">{` ${"amount"} `}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="flex flex-col  justify-between gap-2">
                    <FormLabel className=" font-normal">{` ${"Transfer Pin"} `}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-12 flex justify-between  gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prevData) => ({ ...prevData, step: 1 }))
                  }
                  className="btn btn-outline"
                >
                  back
                </button>
                <button
                  className="btn rounded-full bg-secondary hover:bg-secondary-focus"
                  type="submit"
                >
                  Send Funds
                </button>
              </div>
            </>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SendFundsForm;
