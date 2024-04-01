"use client";
import { Separator } from "@radix-ui/react-separator";
import { type } from "os";
import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoArrowRedoCircle } from "react-icons/io5";

function ContactHeader() {
  return (
    <div className="flex w-full items-center justify-center border-b p-4 px-10 text-primary">
      {/* <div>
        <IoArrowRedoCircle size={20} className="text-primary" />
      </div> */}
      <div className="flex flex-col  gap-4 lg:flex-row">
        <ContactInfoTag
          className="flex"
          Icon={<FaPhone />}
          info="315-303-8365"
        />
        <Separator orientation="vertical" className="border" />

        <ContactInfoTag
          className=" lg:flex"
          Icon={<FaLocationArrow />}
          info="36th Street Gerber Ave Alley, Sacramento, ca, USA"
        />
      </div>
    </div>
  );
}

function ContactInfoTag({
  info,
  Icon,
  className,
}: {
  Icon: React.ReactElement;
  info: string;
  className: string | undefined;
}) {
  return (
    <div
      className={`${className} flex items-center justify-center gap-2 text-xs no-underline`}
    >
      {Icon && Icon}
      <span>{info && info}</span>
    </div>
  );
}

export default ContactHeader;
