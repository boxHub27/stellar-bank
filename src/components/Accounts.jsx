"use client";
import DashBoardCard from "@/app/account/components/card";
import { PopoverDemo } from "@/app/profilemanagement/components/popover";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import AccountSkeleton from "./AccountSkeleton";

function Accounts() {
  const session = useSession();
  const user = session.data?.user;
  const [accountData, setAccountData] = useState();

  const {
    data,
    refetch: refetchAccounts,
    isInitialLoading,
    isLoading,
    status,
  } = api.transaction.getAllUserAccount.useQuery();

  const totalAmount = data?.reduce(
    (total, obj) => total + obj.accountBalance,
    0,
  );
  // let l = true;

  if (isInitialLoading || isLoading) {
    return (
      <div className="w-full overflow-auto  rounded-lg bg-base-200 p-4">
        <div className="h-50 relative grid h-[138px] w-full grid-flow-col gap-4 ">
          <AccountSkeleton />
          <AccountSkeleton />
          <AccountSkeleton />
          <AccountSkeleton />
          <AccountSkeleton />
          <AccountSkeleton />

          {/* <Skeleton className="h-full bg-neutral" />
        <Skeleton className="h-full bg-neutral" />
        <Skeleton className="h-full bg-neutral" /> */}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto  rounded-lg bg-base-300 p-4">
      <div className="h-50 relative -z-0 grid w-full grid-flow-col gap-4 ">
        {}
        <DashBoardCard
          cardTitle={"Total Balance"}
          bgColor={"bg-accent text-black"}
          contentTitle={`$${totalAmount?.toLocaleString()}`}
          cardDescription={<span>+20.1% from last month</span>}
        />
        {data?.map((account) => (
          <DashBoardCard
            key={account?.id}
            cardTitle={account?.accountName || "Default Title"}
            contentTitle={`$${
              account?.accountBalance.toLocaleString() ||
              "Default Content Title"
            }
              
            `}
            bgColor={"bg-base-200 "}
            cardDescription={
              <div className="flex flex-col gap-1">
                <span className="text-xs">account number:</span>
                <span>{`****${account?.accountNumber
                  .toString()
                  .slice(-4)}`}</span>
              </div>
            }
          />
        ))}
        {/* <DashBoardCard
        cardTitle={"Checkings Account"}
        contentTitle={"$45,231.89"}
        cardDescription={"+20.1% from last month"}
      />
      <DashBoardCard
        cardTitle={"Balance"}
        contentTitle={"$45,231.89"}
        cardDescription={"+20.1% from last month"}
      /> */}
      </div>
    </div>
  );
}

export default Accounts;
