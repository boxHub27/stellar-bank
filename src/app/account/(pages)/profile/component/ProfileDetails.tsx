"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiEdit2Line } from "react-icons/ri";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import ProfileForm from "./ProfileForm";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileDetails = () => {
  const [step, setStep] = useState(1);
  const { data, isError, isSuccess, isLoading, failureReason } =
    api.auth.getUserDetails.useQuery();

  function formatPhoneNumber(phoneNumber: number) {
    const cleaned = ("" + phoneNumber).replace(/\D/g, ""); // Remove non-numeric characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // Match the cleaned number to extract parts

    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3]; // Format into (xxx) xxx-xxxx
    }

    // Return the original number if it doesn't match the format
    return phoneNumber;
  }

  const phoneNumber = formatPhoneNumber(Number(data?.number));
  const date = new Date();
  const formattedDate = date.toDateString();

  return (
    <div className="grid space-y-2 overflow-hidden rounded-lg ">
      {step == 2 && (
        <div className="block py-4">
          <div
            className="btn  btn-outline items-center justify-start gap-2 border-base-300  text-xs"
            onClick={() => {
              setStep(1);
            }}
          >
            {" "}
            <MdArrowBackIos /> back
          </div>
        </div>
      )}
      {step == 1 && (
        <>
          <div className="w-full bg-base-300 p-4 ">
            <h1>Profile</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 bg-base-200 py-4">
            <Avatar>
              <AvatarImage src={"/images/personal.png"} />
              <AvatarFallback>image</AvatarFallback>
            </Avatar>
            <div className="text-sm font-semibold">
              {data ? data?.name : <Skeleton className="h-3 w-[100px]" />}{" "}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs">
              <span>last login: </span>
              {data ? (
                formattedDate
              ) : (
                <Skeleton className="h-3 w-[100px]" />
              )}{" "}
            </div>
          </div>
          <div>
            <div className="bg-base-300 px-4 py-2 text-xs">
              <p>contact details</p>
            </div>
            <div>
              <div className="flex justify-between border-b border-base-300 bg-base-200 p-4 text-sm">
                <span>Phone</span>
                <span className="text-xs">
                  {" "}
                  {isLoading && <Skeleton className="h-3 w-[250px]" />}
                  {data?.number && phoneNumber}
                </span>
              </div>
              <div className="flex justify-between border-b border-base-300 bg-base-200 p-4 text-sm">
                <span>Email</span>
                <span className="text-xs">
                  {" "}
                  {isLoading && <Skeleton className="h-3 w-[250px]" />}
                  {data?.email}
                </span>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="mt-2">
            <div className="bg-base-300 px-4 py-2 text-xs">
              <p>Address</p>
            </div>
            <div>
              <div className="flex items-center justify-between border-b border-base-300 bg-base-200 p-4 text-sm">
                <span>Address</span>{" "}
                <span className="text-xs">
                  {" "}
                  {isLoading && <Skeleton className="h-3 w-[250px]" />}{" "}
                  {data?.Address}
                </span>
              </div>
              {/* <p className="flex justify-between border-b border-base-300 bg-base-200 p-4 text-sm">
            <span>Password</span>
            <span>***********</span>
          </p> */}
            </div>
          </div>
          <div className="mt-2 overflow-hidden rounded-b-lg">
            <div className="bg-base-300 px-4 py-2 text-xs">
              <p>SignIn details</p>
            </div>
            <div>
              <div className="flex justify-between border-b border-base-300 bg-base-200 p-4 text-sm">
                <span>Phone</span>
                <span className="text-xs">
                  {" "}
                  {isLoading && <Skeleton className="h-3 w-[250px]" />}
                  {data?.number && phoneNumber}
                </span>
              </div>
              <div className="flex justify-between border-b border-base-300 bg-base-200 p-4 text-sm">
                <span>Password</span>
                <span>
                  {isLoading ? (
                    <Skeleton className="h-3 w-[250px]" />
                  ) : (
                    " ***********"
                  )}{" "}
                </span>
              </div>
            </div>
          </div>
          <button
            className="btn bg-primary text-white hover:bg-purple-700"
            onClick={() => setStep(2)}
          >
            <RiEdit2Line size={20} />
            Edit profile
          </button>
        </>
      )}
      {step == 2 && (
        <>
          <ProfileForm />
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
