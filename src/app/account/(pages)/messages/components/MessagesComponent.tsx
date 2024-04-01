"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";
import img from "../../../../../../public/images/AlertImages/undraw_typing_re_d4sq.svg";

const MessagesComponent = () => {
  return (
    <div>
      {/* <Tabs
        defaultValue="account"
        className="flex w-full flex-col gap-9 bg-transparent"
      > */}
      {/* <TabsList className="flex w-full justify-start rounded-none border-b border-neutral bg-transparent ">
          <TabsTrigger value="account" className="text-xs">
            Inbox
          </TabsTrigger>
        </TabsList> */}
      {/* <TabsContent value="account"> */}
      <div className="flex w-full flex-col  items-center justify-center gap-8">
        <Image
          alt="image"
          width={1000}
          height={1000}
          className="w-[50%] object-contain  lg:w-[20%]"
          src={"/images/AlertImages/undraw_typing_re_d4sq.svg"}
        />
        <p>There are no messages in your Inbox</p>
      </div>
      {/* </TabsContent> */}
      {/* </Tabs> */}
    </div>
  );
};

export default MessagesComponent;
