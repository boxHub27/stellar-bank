import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "../account/components/sidebar-nav";
import { useSession } from "next-auth/react";
import AuthChecker from "./components/AuthChecker";
import { Suspense } from "react";
// import Loading from "./loading";

export const metadata: Metadata = {
  title: "Profile-management",
  description: "Edit profile",
};

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/examples/forms",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      {/* <AuthChecker> */}
      <SidebarNav items={sidebarNavItems}>{children}</SidebarNav>
      {/* </AuthChecker> */}
    </>
  );
}
