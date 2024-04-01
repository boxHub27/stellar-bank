"use client";
import React from "react";
import ApplyForm from "./ApplyForm/ApplyForm";
import Image from "next/image";
import { RiSecurePaymentFill } from "react-icons/ri";
import Link from "next/link";

function Apply() {
  return (
    <div
      id="application-form"
      className=" grid  w-full  px-4 py-16 md:px-32 lg:grid-cols-2"
    >
      <div>
        <div className="hidden md:block">
          <Image
            src={"/images/Apply.png"}
            alt="image"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <div className="bg-base-2000 flex flex-col items-center justify-center space-y-4 rounded-lg border border-primary-content  p-10 shadow-2xl backdrop-blur-lg">
        <div className="space-y-2">
          <RiSecurePaymentFill size={50} />
          <h1 className="text-xl font-extrabold">
            {" "}
            <span className="text-primary">Apply</span> for an Account
          </h1>
          <p className="text-sm">
            Unlock financial possibilities.
            <span className="text-primary">
              {" "}
              Apply for an account today and access tailored services with ease.
            </span>
          </p>
        </div>
        <div className="w-full">
          <ApplyForm />
          <p className="mt-4 text-xs">
            have an account?{" "}
            <Link
              href={"/sign-in"}
              className="cursor-pointer text-primary underline"
            >
              sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Apply;
