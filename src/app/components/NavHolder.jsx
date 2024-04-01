"use client";
import React from "react";
import NavBar from "./NavBar";
import { useRouter, usePathname } from "next/navigation";
import ContactHeader from "./ContactHeader";

const NavHolder = () => {
  const route = usePathname();
  // if (route == "/sign-in" || "/sign-up") {
  //   return null;
  // } else
  // return <NavBar />;
  return (
    <>
      {route != "/sign-up" && route != "/sign-in" && (
        <>
          <ContactHeader />
          <NavBar />
        </>
      )}
    </>
  );
};

export default NavHolder;
