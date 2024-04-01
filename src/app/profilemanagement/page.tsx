"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import DashBoardCard from "../account/components/card";
import Accounts from "@/components/Accounts";
import { PopoverDemo } from "./components/popover";
import { Overview } from "../account/components/overview";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionForm } from "./components/TransactionForm.1";

const page = () => {
  return (
    <div className="grid h-fit gap-8 overflow-scroll p-8">
      <div className="grid h-full w-full gap-4">
        <h3 className="bg-opacity-60 text-xs  text-base-content">
          Balance/ <span>accounts</span>
        </h3>
        <Accounts />
        <div className="">
          <PopoverDemo title={"Add New Account"} />{" "}
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Tabs defaultValue="credit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credit">Credit</TabsTrigger>
            <TabsTrigger value="password">Debit</TabsTrigger>
          </TabsList>
          <TabsContent value="credit">
            <TransactionForm
              cardTitle={"Credit transaction"}
              cardDescription={"Add a credit transaction"}
              transactionType="credit"
            />
            {/* <Card>
              <CardHeader>
                <CardTitle>Credit</CardTitle>
                <CardDescription>create a credit transaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card> */}
          </TabsContent>
          <TabsContent value="password">
            <TransactionForm
              transactionType="debit"
              cardTitle={"Debit transaction"}
              cardDescription={"Add a Debit transaction"}
            />
          </TabsContent>
        </Tabs>
        <Card className="">
          <CardHeader>
            <CardTitle>Recent transaction</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>{/* <RecentSales /> */}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
