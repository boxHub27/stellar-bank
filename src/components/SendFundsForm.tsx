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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdErrorOutline } from "react-icons/md";
import { api } from "@/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FaExclamationCircle, FaSpinner } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { ArrowBigLeft } from "lucide-react";

export const SendFundsForm = () => {
  const [formData, setFormData] = useState({
    // name: "",
    // amount: "",
    // accountToSendFrom: "",
    // accountNumber: "",
    // routingNumber: "",
    // pin: "",
    step: 1,
  });

  const [pageLoading, setPageLoading] = useState(false);

  const {
    mutate: transferMutate,
    data,
    isLoading: transferIsLoading,
    isSuccess: transferIsSuccess,
    isError,
    failureReason,
    reset,
  } = api.transaction.transfer.useMutation();

  const { refetch: refectTransactions } =
    api.transaction.getAllRecentTransactionsByCurrentMonth.useQuery();
  const { data: accounts, isLoading: accountIsLoading } =
    api.transaction.getAllUserAccount.useQuery();

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
    receiverBank: z.string().min(3).max(50),
    description: z.string(),
    amount: z.string().min(3),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const formSchema3 = z.object({
    pin: z
      .string()
      .min(1, {
        message: "Pin is incorrect or too short ",
      })
      .max(4, {
        message: "pin is not more than 4 digit",
      }),
    transactionAccountId: z.string(),
  });

  const form3 = useForm<z.infer<typeof formSchema3>>({
    resolver: zodResolver(formSchema3),
  });

  const handleSubmitFormTwo = (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      ...stepOneForm.getValues(),
    };
    console.log(data);

    setFormData((prevData) => ({ ...prevData, step: 3 }));
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

  const handleTransfer = async (form3Value: z.infer<typeof formSchema3>) => {
    const getAccountId = accounts?.find(
      (account) => account.id == form3Value.transactionAccountId,
    );
    const data = {
      ...form.getValues(),
      ...stepOneForm.getValues(),
      ...form3Value,
      transactionAccount: getAccountId ? getAccountId.accountName : "",
    };
    console.log(getAccountId?.accountName);
    console.log(data);

    if (data.pin == "3224") {
      setPageLoading(true);
      const delayInMilliseconds = 4000;

      const loading = () => {
        setPageLoading(false);
        setFormData((pD) => ({ ...pD, step: 404 }));
      };

      setTimeout(loading, delayInMilliseconds);
    } else {
      transferMutate({
        ...data,
        transactionType: "debit",
        transactionStatus: "Pending",
        description: "",
      });
      if (transferIsSuccess) {
        await refectTransactions();
        console.log(transferIsSuccess);
      }
    }
  };

  if (isError) {
    return (
      <div className="rounded-md bg-neutral p-8 shadow-md">
        <div className="flex items-center justify-center text-red-500">
          <MdErrorOutline className="text-4xl" />
          <h1 className="ml-2 text-2xl font-semibold">Transaction Failed</h1>
        </div>
        <p className="mt-4 text-sm">
          {failureReason
            ? failureReason.message
            : "  We're sorry, but the transaction couldn't be completed at this time.  Your account has been placed on hold for security reasons. Kindly Visit your nearest Branch."}
        </p>

        {failureReason ? (
          <button
            className="btn mt-6 bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            onClick={() => {
              reset();
              setFormData((prevData) => ({ ...prevData, step: 3 }));
              console.log(formData);
            }}
          >
            <FiChevronLeft size={20} />
            <span> Back</span>
          </button>
        ) : (
          // <button
          //   className="btn mt-6 bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          //   onClick={() => {
          //     reset();
          //     setFormData((prevData) => ({ ...prevData, step: 3 }));
          //     // console.log(formData);
          //   }}
          // >
          //   Account DashBoard
          // </button>
          <></>
        )}
        {/* 
        <button
          className="btn mt-6 bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          onClick={() => {
            reset();
            setFormData((prevData) => ({ ...prevData, step: 3 }));
            console.log(formData);
          }}
        >
          {failureReason ? (
            <span className="flex items-center justify-center gap-1">
              <FiChevronLeft size={20} />
              <span> Back</span>
            </span>
          ) : (
            " Account Dashboard"
          )}
        </button> */}
      </div>
    );
  }
  if (formData.step === 404) {
    return (
      <div className="rounded-md bg-neutral p-8 shadow-md">
        <div className="flex items-center justify-center text-red-500">
          <MdErrorOutline className="text-4xl" />
          <h1 className="ml-2 text-2xl font-semibold">Transaction Failed</h1>
        </div>
        <p className="mt-4 text-sm">
          {` We're sorry, but the transaction couldn't be completed at this time.
          Your account has been placed on hold for security reasons. Kindly
          Visit your nearest Branch.`}
        </p>
        <button
          className="btn mt-6 bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          onClick={() => {
            reset();
            setFormData((prevData) => ({ ...prevData, step: 3 }));
            console.log(formData);
          }}
        >
          <FiChevronLeft size={20} />
          <span> Back</span>
        </button>
      </div>
    );
  }

  if (transferIsLoading || pageLoading == true) {
    return (
      <div className="flex items-center space-x-4 rounded-md bg-white p-6 shadow-lg">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <div>
          <h2 className="text-lg font-semibold">Loading...</h2>
          <p className="text-sm text-gray-600">
            Please wait while we process your Transfer.
          </p>
        </div>
      </div>
    );
  }

  if (transferIsSuccess) {
    return (
      <div className="flex items-center space-x-4 rounded-lg bg-white p-6 shadow-lg">
        <FaExclamationCircle className="text-4xl text-yellow-500" />
        <div>
          <h2 className="text-lg font-semibold">Transaction Pending</h2>
          <p className="text-sm text-gray-600">
            We are processing your transaction. Your account has been placed on
            hold. Kindly Visit your nearest Branch.
          </p>
          {/* <DialogPrimitive.Close className="btn mt-4 rounded-full border-0 bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Account DashBoard
          </DialogPrimitive.Close> */}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2 text-white">
      {formData.step === 1 && (
        <Form {...stepOneForm}>
          <form
            className="flex w-full flex-col gap-6 text-white"
            onSubmit={stepOneForm.handleSubmit(handleSubmitFormOne)}
          >
            <FormField
              control={stepOneForm.control}
              name="receiverName"
              render={({ field }) => (
                <FormItem className="flex flex-col  justify-between gap-0">
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
              name="receiverAccountNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col  justify-between gap-0">
                  <FormLabel className="font-normal">{` ${"Account Number"} `}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs text-secondary" />
                </FormItem>
              )}
            />
            <FormField
              control={stepOneForm.control}
              name="receiverRoutingNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col  justify-between gap-0">
                  <FormLabel className=" font-normal">{` ${"Routing Number"} `}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage className={"text-xs text-secondary"} />
                </FormItem>
              )}
            />

            <Button
              className="hover:bg-secondary-focus mt-12 rounded-full bg-secondary"
              type="submit"
            >
              Next
            </Button>
          </form>
        </Form>
      )}
      {formData.step === 2 && (
        <Form {...form}>
          <form
            className="flex w-full flex-col gap-6 dark:text-white"
            onSubmit={form.handleSubmit(handleSubmitFormTwo)}
          >
            <FormField
              control={form.control}
              name="receiverBank"
              render={({ field }) => (
                <FormItem className="flex flex-col  justify-between gap-0">
                  <FormLabel className="font-normal">{` ${"Bank Name"} `}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs text-secondary" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex flex-col  justify-between gap-0">
                  <FormLabel className="font-normal">{` ${"Amount"} `}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs text-secondary" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col  justify-between gap-0">
                  <FormLabel className=" font-normal">{` ${"Add a Note (optional)"} `}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="example (For John  Deo...)"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-xs text-secondary" />
                </FormItem>
              )}
            />

            <div className="mt-12 flex justify-between gap-4  dark:text-white">
              <button
                type="button"
                onClick={() =>
                  setFormData((prevData) => ({ ...prevData, step: 1 }))
                }
                className="btn  btn-outline dark:text-white"
              >
                back
              </button>
              <button
                className="hover:bg-secondary-focus btn  rounded-full bg-secondary dark:text-white"
                // onClick={() =>
                //   setFormData((prevData) => ({ ...prevData, step: 3 }))
                // }
                type="submit"
              >
                Next
              </button>
            </div>
          </form>
        </Form>
      )}
      {formData.step === 3 && (
        <Form {...form3}>
          <form
            className="flex w-full flex-col gap-2 dark:text-white"
            onSubmit={form3.handleSubmit(handleTransfer)}
          >
            <FormField
              control={form3.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col  justify-between gap-0">
                  <FormLabel className="font-normal">{` ${"Enter Your Transaction Pin (4 digits)"} `}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="****" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs text-secondary" />
                </FormItem>
              )}
            />
            <FormField
              control={form3.control}
              name="transactionAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal ">
                    select account to Transfer From
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      // defaultValue={"Checkings"}
                    >
                      <SelectTrigger
                        id="security-level"
                        className="line-clamp-1 w-full truncate"
                      >
                        <SelectValue
                          className="flex w-full justify-between"
                          placeholder="select account to Transfer From"
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full bg-base-100">
                        {accounts?.map((account) => (
                          <SelectItem
                            key={account.id}
                            value={account.id}
                            className="flex w-full justify-between gap-16"
                          >
                            {account.accountName}
                            {/* <div className="flex w-[100%] flex-row items-center justify-between gap-4">
                                <span>{account.accountName}</span>
                                <span className="badge badge-neutral flex items-center justify-center rounded-full p-2 text-xs">
                                  current Bal
                                  {`  $${account.accountBalance.toLocaleString()}`}
                                </span>
                              </div> */}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-12 flex justify-between  gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData((prevData) => ({ ...prevData, step: 2 }))
                }
                className="btn btn-outline"
              >
                back
              </button>
              <button
                className="hover:bg-secondary-focus btn rounded-full bg-secondary"
                type="submit"
              >
                Send Funds
              </button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
