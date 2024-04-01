"use client";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Overview } from "./components/overview";
import * as Icon from "react-feather";
import DashBoardCard from "./components/card";
import { api } from "@/trpc/react";
import UserAccounts from "./components/UserAccounts";
import { toast } from "@/components/ui/use-toast";
import TransactionList from "./components/TransactionList";
import SendMoney from "./components/SendMoney";
import { BsSendPlus } from "react-icons/bs";
import { DialogDemo } from "./components/TransferComponent";

const Page = () => {
  const session = useSession();
  const route = useRouter();

  const user = session.data?.user;

  console.log(user);

  const {
    data: transactions,
    refetch: refetchTransactions,
    isLoading: isLoadingTransactoins,
  } = api.transaction.getAllRecentTransactionsByCurrentMonth.useQuery();

  const deleteAllTransactions =
    api.transaction.deleteAllTransactions.useMutation({
      onSuccess(data, variables, context) {
        // setLoading(false);
        // form.reset();
        console.log(data);
        void refetchTransactions();
        toast({
          description: `You have deleted all transactions ${data.count}`,
          className: "bg-base-100",
        });
      },
    });

  if (session.status == "unauthenticated") {
    route.push("/sign-in");
  }

  if (transactions) {
    transactions.forEach((date) => {
      console.log(date.transactionDate.toDateString());
    });
  } else {
    console.log("no transactions");
  }

  return (
    <div className="grid h-fit gap-2 overflow-scroll p-8">
      <div className="grid gap-2 md:grid-cols-2">
        <div className="h-80">
          <Card className="h-full border-0 bg-gradient-to-br from-orange-900 via-yellow-800 to-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">My Cards</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-muted-foreground h-4 w-4"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>Cards loading.......</CardContent>
          </Card>
        </div>
        <UserAccounts />
      </div>
      <div className="grid gap-2 md:grid-cols-6">
        <div className="col-span-6 grid h-auto gap-2 md:grid-cols-7 lg:col-span-4">
          <div className="card grid border border-base-300 md:col-span-3">
            <CardHeader>
              <CardTitle>spending Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </div>
          <div className=" card grid border border-base-300 md:col-span-4">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
            </CardHeader>
            <CardContent className="h-56 overflow-scroll">
              <TransactionList />
            </CardContent>
          </div>
        </div>
        <div className="col-span-6 grid w-full gap-4 lg:col-span-2">
          <div className="card flex w-full flex-row items-start justify-start gap-4 border border-base-200 px-4 py-4 ">
            <BsSendPlus size={20} />
            <div className="w-full space-y-2 ">
              <div className="">
                <h1 className="font-bold">Send Money</h1>
                <p className="text-xs font-light">
                  send money to family, friends and team member{" "}
                </p>
              </div>
              <DialogDemo
                prop={
                  <div className="btn w-full bg-[#82ca9d] dark:text-black">
                    Send Money
                  </div>
                }
              />
            </div>
          </div>
          <SendMoney />
        </div>
      </div>
    </div>
  );
};

export default Page;
