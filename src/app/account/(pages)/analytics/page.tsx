"use client";
import React from "react";
import { Overview } from "../../components/overview";
import AccountReport from "./components/AccountReport";
import TransactionList from "../../components/TransactionList";
import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";

const page = () => {
  return (
    <div className="grid h-fit gap-8 overflow-scroll p-8">
      {/* <div>h1 world</div> */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="col-span-1 space-y-4 rounded-md border  p-4">
          <p className="text-sm">Account Interaction OverView</p>
          <Overview />
        </div>
        <div className=" w-full space-y-4 rounded-md bg-base-300  p-4">
          <p className="text-sm ">Current Account Analytics</p>
          <AccountReport />
        </div>
      </div>
      <div className="card grid  gap-4">
        <div className="space-y-4">
          <p>Recent Transactions</p>
          <ScrollArea className=" min-h-16 card border p-4 ">
            <ScrollArea className="h-full max-h-72 overflow-scroll">
              <TransactionList />
            </ScrollArea>
            <Scrollbar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default page;
