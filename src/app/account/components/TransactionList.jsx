// import { Avatar, Badge, Icon } from "shadcn-ui"; // Replace with your specific import path for Shadcn components
"use client";
import { FaMoneyBillWave, FaMoneyBillWaveAlt } from "react-icons/fa"; // Replace with your specific import path for React Icons
import { api } from "@/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBase } from "react-icons";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const TransactionList = ({}) => {
  const load = true;
  const {
    data: transactions,
    refetch: refetchTransactions,
    isLoading: isLoadingTransactoins,
    isError: isTransactionError,
    failureReason,
  } = api.transaction.getAllTransactions.useQuery();

  // const {} = api.transaction.getAllTransactions.
  const loadItem = ["1", "1", "1", "1", "1", "1"];

  if (isLoadingTransactoins) {
    return (
      <div className="space-y-2 overflow-auto">
        {/* {loadItem.map((item) => ( */}
        <div
          // key={item}
          className="flex items-center space-x-4 rounded-md bg-base-200 p-2"
        >
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-2 w-[250px]" />
            <Skeleton className="h-2 w-[200px]" />
          </div>
        </div>
        {/* // ))} */}
      </div>
    );
  }

  if (isTransactionError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="max-w-md pt-10 text-center font-light">
          {failureReason?.message}
        </p>
        <button
          onClick={() => refetchTransactions()}
          className="btn btn-secondary"
        >
          reload
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions?.map((transaction, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-md px-4 py-2 shadow-sm transition duration-150  ease-in-out hover:bg-base-200 "
        >
          {/* Avatar */}

          <Avatar>
            <AvatarImage src={"/images/personal.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* Details */}
          <div className="ml-4 flex flex-1 flex-row items-center justify-between">
            <div className="flex flex-col">
              <p className="text-xs font-semibold ">
                {transaction.receiverName}
              </p>
              <span className="text-xs text-gray-500">
                {transaction.transactionDate.toDateString()}
              </span>
            </div>

            {/* Status */}
            <div className=" items-center  md:flex">
              <Badge
                className={`text-xs font-light ${
                  transaction.transactionStatus == "Completed" && "bg-green-400"
                }
                ${transaction.transactionStatus == "Pending" && "bg-blue-400"}
                ${transaction.transactionStatus == "Canceled" && "bg-red-400"}
                mr-2 text-xs text-gray-900`}
              >
                {transaction?.transactionStatus.toLowerCase()}
              </Badge>
              {/* Add icons or indicators based on transaction status */}
            </div>

            <div className="flex min-w-min items-start">
              <p className="text-sm  font-medium">
                {}
                {transaction.transactionType == "credit" ? (
                  <span>+ </span>
                ) : (
                  <span>- </span>
                )}
                $
                {transaction &&
                  parseFloat(
                    transaction.amount.replace(/[^\d.-]/g, ""),
                  ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
