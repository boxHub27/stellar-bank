import React, { ReactChildren } from "react";
import { BsSendPlus } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SendFundsForm } from "@/components/SendFundsForm";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const TransferComponent = () => {
  return (
    <div className="grid w-full gap-0.5">
      <div className="card flex w-full flex-row items-start justify-start gap-4 border border-base-300 px-4 py-4">
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
              <div className="btn w-full bg-primary text-white">Send Money</div>
            }
          />
        </div>
      </div>
      <div className="card flex w-full flex-row items-start justify-start gap-4 border border-base-300 px-4 py-4">
        <FaMoneyBillTransfer size={20} />
        <div className="w-full space-y-2 ">
          <div className="">
            <h1 className="font-bold">Pay Bills Online</h1>
            <p className="text-xs font-light">
              send money to family, friends and team member{" "}
            </p>
          </div>
          <Popover>
            <PopoverTrigger className="w-full">
              <p className="btn-base-100 btn w-full   dark:text-black">
                Enroll now
              </p>
            </PopoverTrigger>
            <PopoverContent className="border-base-300 bg-base-300 ">
              <p className="text-xs font-light text-neutral">
                {`Apologies, you're ineligible for this service. For assistance, please contact support at (884) 787 1562.`}
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export function DialogDemo({ prop }: { prop: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        <div className="flex w-full flex-col items-center justify-center gap-1 rounded-lg ">
          {/* <Avatar>
            <AvatarImage src={"/images/personal.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          {prop}
          {/* <p className="text-center text-xs font-medium">{prop}</p> */}
        </div>
      </DialogTrigger>
      <DialogContent className="backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle>Make Your Transfer</DialogTitle>
          <DialogDescription>Send Money Easy and Secure</DialogDescription>
        </DialogHeader>
        <SendFundsForm />
      </DialogContent>
    </Dialog>
  );
}

export default TransferComponent;
