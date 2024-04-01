"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import * as Icon from "react-feather";
import { DropdownMenuDemo } from "./avatarDropDown";
import NavList from "./navList";
import { useSession, signOut } from "next-auth/react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BiTransferAlt } from "react-icons/bi";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({
  className,
  children,
  items,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();

  const navList = [
    {
      title: "Overview",
      path: "/account",
      icon: <Icon.Grid size={14} />,
      active: pathname == "/account" ? true : false,
    },
    {
      title: "Messages",
      path: "/account/messages",
      icon: <Icon.Mail size={14} />,
      active: pathname == "/account/messages" ? true : false,
    },
    {
      title: "Analytics",
      path: "/account/analytics",
      icon: <Icon.Activity size={14} />,
      active: pathname == "/account/analytics" ? true : false,
    },
    {
      title: "Transfer",
      path: "/account/transfer",
      icon: <Icon.CreditCard size={14} />,
      active: pathname == "/account/transfer" ? true : false,
    },
    {
      title: "Transaction-History",
      path: "/account/transaction-history",
      icon: <BiTransferAlt size={16} />,
      active: pathname == "/account/transaction-history" ? true : false,
    },
    {
      title: "Profile",
      path: "/account/profile",
      icon: <Icon.User size={14} />,
      active: pathname == "/account/profile" ? true : false,
    },
  ];

  const user = useSession().data;

  return (
    <div className="drawer   lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar sticky bottom-1 left-0 top-0 z-50 w-full border-b border-base-300 bg-base-100 lg:p-2">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer"
              aria-label="open sidebar"
              className="lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mdtext-lg mx-2 flex-1 px-2 font-semibold capitalize">
            {pathname == "/account" ? "Overview" : pathname.split("/account/")}
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <div className="flex items-center justify-center gap-2">
                <div>
                  <div className="flex gap-2">
                    <div className="rounded-md bg-base-300 p-2">
                      <Icon.Mail size={14} />
                    </div>
                    <div className="rounded-md bg-base-300 p-2">
                      <Icon.Bell size={14} />
                    </div>
                  </div>
                </div>
                <DropdownMenuDemo
                  image={"/images/logo"}
                  name={user?.user.name ?? ""}
                />
              </div>
            </ul>
          </div>
        </div>
        {children}
        {/* Content adhgsdjgdjhgds */}
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu h-full w-72 p-4">
          <ul className="menu relative min-h-full w-full rounded-md bg-base-200 p-4 md:w-full">
            <Link
              href={"/"}
              className="flex  w-full items-center justify-center"
            >
              <Image
                width={150}
                alt="logo"
                height={150}
                // data-theme="dark:block"
                className="dark:hidden"
                src={"/logoColored1.svg"}
              />
              <Image
                width={150}
                alt="logo"
                height={150}
                // data-theme="dark:hidden"
                className=" hidden dark:block"
                src={"/logoColored.svg"}
              />
            </Link>
            <div className={"my-5 h-0.5 border border-base-300 "} />
            <p className="p-4 text-xs uppercase">Main menu</p>
            {/* Sidebar content here */}
            <ul className="flex flex-col gap-2">
              {navList.map((nav) => (
                <NavList
                  key={nav.title}
                  active={nav.active}
                  path={nav.path}
                  icon={nav.icon}
                  title={nav.title}
                />
              ))}
            </ul>
            <li
              className={` absolute bottom-4  left-0 w-full rounded-md bg-base-300 text-xs`}
            >
              <button onClick={() => signOut()} className="flex gap-2 py-3">
                <RiLogoutCircleLine size={15} />
                <span>{"sign out"}</span>
              </button>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}
