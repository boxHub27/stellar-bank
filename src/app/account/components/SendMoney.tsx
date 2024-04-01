import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/trpc/react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendFundsForm } from "@/components/SendFundsForm";
import Partners from "@/app/components/Partners";

interface User {
  receiverName: string;
  // Other properties...
}

function SendMoney() {
  const {
    data,
    isLoading: friendsLoading,
    isError: friendsError,
    refetch,
    failureReason,
  } = api.transaction.getAccountByTransaction.useQuery();

  if (data?.length == 0) {
    return (
      <div className="w-full  px-8">
        <Partners />
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2">
        <h3 className="text-lg font-bold">Send Money to</h3>
      </div>
      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-4">
        {data?.map((tran) => (
          // <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-base-200 p-2">
          //   <Avatar>
          //     <AvatarImage src={"/images/personal.png"} />
          //     <AvatarFallback>CN</AvatarFallback>
          //   </Avatar>
          //   <p className="text-center text-xs font-medium">
          //     {tran.receiverName}
          //   </p>
          // </div>
          <DialogDemo key={tran.id} UserName={tran.receiverName} User={tran} />
        ))}
      </div>
    </div>
  );
}

export function DialogDemo({
  User,
  key,
  UserName,
}: {
  UserName: string;
  User: object;
  key: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-base-200 p-2">
          <Avatar>
            <AvatarImage src={"/images/personal.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-center text-xs font-medium">{UserName}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make Your Transfer</DialogTitle>
          <DialogDescription>Send Money Easy and Secure</DialogDescription>
        </DialogHeader>
        <SendFundsForm />
      </DialogContent>
    </Dialog>
  );
}

export default SendMoney;
