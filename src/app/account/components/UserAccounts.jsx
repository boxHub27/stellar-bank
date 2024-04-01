import React from "react";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import AccountSkeleton from "@/components/AccountSkeleton";
import DashBoardCard from "./card";

const UserAccounts = () => {
  const session = useSession();
  const user = session.data?.user;

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

  if (isInitialLoading || isLoading) {
    return (
      <div className="grid max-h-80 grid-cols-2 gap-4 overflow-auto text-black">
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
    );
  }

  return (
    <div className="grid max-h-80 grid-cols-2 gap-2 overflow-auto text-black md:gap-2 ">
      <DashBoardCard
        cardTitle={"Account Balance"}
        bgColor={"bg-primary text-white"}
        contentTitle={`$${totalAmount?.toLocaleString()}`}
        cardDescription={<span>+20.1% from last month</span>}
      />
      {data?.map((account) => (
        <DashBoardCard
          key={account.accountName}
          bgColor={"bg-base-300"}
          cardTitle={account.accountName}
          contentTitle={`$${account?.accountBalance.toLocaleString()}`}
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
      cardTitle={"Balance"}
      contentTitle={"$45,231.89"}
      cardDescription={"+20.1% from last month"}
    />
    <DashBoardCard
      cardTitle={"Balance"}
      contentTitle={"$45,231.89"}
      cardDescription={"+20.1% from last month"}
    /> */}
    </div>
  );
};

export default UserAccounts;
