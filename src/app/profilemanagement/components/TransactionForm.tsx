"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { date, string, z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Console } from "console";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

export function TransactionForm({
  cardTitle,
  cardDescription,
  transactionType,
}: {
  cardTitle: string;
  cardDescription: string;
  transactionType: string;
}) {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    receiverName: z.string().min(2).max(50),
    receiverBank: z.string().min(3).max(50),
    transactionAccount: z.string(),
    transactionAccountId: z.string(),
    transactionStatus: z.string().min(3),
    amount: z.string(),
    transactionType: z.string().min(3).max(50),
    receiverAccountNumber: z
      .string()
      .min(3)
      .max(90000000 * 25),
    receiverRoutingNumber: z
      .string()
      .min(3)
      .max(90000000 * 25),
    transactionDate: z.date(),
  });

  function generateRandomNumber() {
    const length = 9;
    const chars = "0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }

    return result;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverName: "",
      receiverBank: "",
      amount: "",
      transactionAccountId: "",
      transactionAccount: "Checkings",
      transactionStatus: "Completed",
      transactionType: transactionType,
      receiverAccountNumber: generateRandomNumber(),
      receiverRoutingNumber: generateRandomNumber(),
      transactionDate: new Date(),
    },
  });

  const session = useSession();
  const user = session.data?.user;

  const { data, refetch: refetchAccounts } =
    api.transaction.getAllUserAccount.useQuery();

  const createTransactionApi = api.transaction.createTransaction.useMutation({
    onSuccess(data) {
      setLoading(false);
      form.reset();
      console.log(data);
      void refetchAccounts();
      toast({
        description: data.message,
        className: "bg-base-100",
      });
    },
    onError(error, variables, context) {
      console.log(error);
      toast({
        variant: "destructive",
        description: error.message,
        className: "bg-error",
      });
    },
    onMutate(variables) {
      setLoading(true);
    },
  });
  function creditTransaction(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const getAccountId = data?.find(
      (account) => account.accountName == values.transactionAccount,
    );
    console.log(getAccountId);
    console.log({
      ...values,
      transactionAccountId: getAccountId?.id,
    });

    const iddd = values.transactionAccount;
    console.log(iddd);

    // createTransactionApi.mutate({
    //   ...values,

    //   transactionAccountId: iddd.,
    // });

    // createTransactionApi.mutate({
    //   ...values,
    //   transactionAccountId: getAccountId ? getAccountId?.id : "",
    // });
  }

  return (
    <Card className={"w-full"}>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent className="grid w-full gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(creditTransaction)}
            className="flex w-full flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="receiverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">{` ${
                    transactionType == "debit"
                      ? "Receiver's name"
                      : "Sender's name"
                  } `}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="receiverBank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    {` ${
                      transactionType == "debit"
                        ? " Receiver's Bank Name"
                        : "Sender's Bank Name"
                    } `}
                    {` Receiver's Bank Name`}
                  </FormLabel>
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
                <FormItem>
                  <FormLabel className="font-normal">Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="receiverAccountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">
                        {` ${
                          transactionType == "debit"
                            ? "  Receiver's Account Number"
                            : "Sender's Account Number"
                        } `}
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="receiverRoutingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">
                        {` ${
                          transactionType == "debit"
                            ? "  Receiver's Routing Number"
                            : "Sender's Routing Number"
                        } `}
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid w-full grid-flow-row gap-4">
              <div className="grid w-full gap-2">
                <FormField
                  control={form.control}
                  name="transactionAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">
                        select account to be credited
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ?? ""}
                          onValueChange={field.onChange}
                          defaultValue={"Checkings"}
                        >
                          <SelectTrigger
                            id="security-level"
                            className="line-clamp-1 w-full truncate"
                          >
                            <SelectValue placeholder="  select account to be credited" />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-base-100">
                            {data?.map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.accountName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid w-full gap-2">
                <FormField
                  control={form.control}
                  name="transactionDate"
                  render={({ field }) => (
                    <FormItem className="flex  flex-col gap-2">
                      <FormLabel className="font-normal">
                        Transaction Date
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                // variant={"outline"}
                                className={cn(
                                  "border border-base-300 bg-transparent text-sm font-light hover:bg-base-200",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto bg-base-100 p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid w-full gap-2">
                <FormField
                  control={form.control}
                  name="transactionStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">
                        Transaction Status
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ?? ""}
                          defaultValue="Completed"
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="transaction-status"
                            className="line-clamp-1 w-full truncate"
                          >
                            <SelectValue placeholder="Select transaction status" />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-base-100">
                            {/* Add your status options here */}
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type={`${loading ? "button" : "submit"}`}
              className={`${
                loading && "disabled disabled:bg-base-100"
              } bg-base-300 hover:bg-base-200`}
            >
              {loading ? <BeatLoader color="#F06C0D" size={8} /> : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
