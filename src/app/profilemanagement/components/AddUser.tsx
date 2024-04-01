"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { v4 } from "uuid";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";

const AddUser = () => {
  const [loading, setLoading] = useState(false);

  const usedInits = new Set();
  const session = useSession();

  function generateUniqueInit() {
    let uniqueInit = "";
    do {
      const uuid = v4();
      // const uuid = uuidv4(); // Generate a version 4 (random) UUID
      uniqueInit = uuid.replace(/\D/g, ""); // Remove non-numeric characters from the UUID
      uniqueInit = uniqueInit.substr(0, 8); // Ensure the init is 8 characters long
    } while (usedInits.has(uniqueInit)); // Continue generating until a unique init is found

    usedInits.add(uniqueInit); // Add the generated init to the set of used inits
    return uniqueInit;
  }
  const user = session.data?.user;
  const { data, refetch: refetchAccounts } =
    api.transaction.getAllUserAccount.useQuery();
  const formSchema = z.object({
    accountName: z.string().min(2).max(50),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: "",
    },
  });

  const addUserApi = api.transaction.createBankAccount.useMutation({
    onSuccess(data) {
      void refetchAccounts();
      toast({
        description: "Account has been created",
        className:
          "bottom-0 left-0  flex fixed md:max-w-[420px] md:bottom-4 md:left-4",
      });
      console.log(data);
    },
    onError(error) {
      console.log(error);
      toast({
        className:
          "bottom-0 left-0  flex fixed md:max-w-[420px] md:bottom-4 md:left-4",
        description: error.message.split("Error:"),
      });
    },
  });

  function addUser(values: z.infer<typeof formSchema>) {
    const accountNumber = parseInt(generateUniqueInit(), 10);
    addUserApi.mutate({
      accountBalance: 0.0,
      accountName: values.accountName,
      routingNumber: 111008883,
      accountNumber: accountNumber,
    });

    console.log(values, accountNumber);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(addUser)} className="space-y-4">
        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-normal">
                Account Name
              </FormLabel>
              <FormControl>
                <Input
                  id="width"
                  // defaultValue="Savings"
                  placeholder={"savings"}
                  className="col-span-2 h-8"
                  type="text"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription disabled className="text-xs">
                Add a new account
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          className="border-0.5 m-0 w-full rounded-md bg-base-300 py-2 text-xs transition-all hover:bg-secondary dark:bg-neutral  dark:hover:bg-secondary dark:hover:text-black"
          type="submit"
        >
          Create
        </button>
      </form>
    </Form>
  );
};

export default AddUser;
