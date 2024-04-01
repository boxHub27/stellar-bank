import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowBigDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import * as Icon from "react-feather";
import { BiTransfer } from "react-icons/bi";
import Link from "next/link";
export function DropdownMenuDemo({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

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
      title: "Payment",
      path: "/account/payment",
      icon: <Icon.CreditCard size={14} />,
      active: pathname == "/account/payment" ? true : false,
    },
    {
      title: "Transfer",
      path: "/account/transfer",
      icon: <BiTransfer size={16} />,
      active: pathname == "/account/transfer" ? true : false,
    },
    {
      title: "Profile",
      path: "/account/profile",
      icon: <Icon.User size={14} />,
      active: pathname == "/account/profile" ? true : false,
    },
  ];

  return (
    <DropdownMenu>
      <div onClick={() => handleToggle}>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <div className="flex cursor-pointer items-center justify-center gap-2 rounded-full p-2 capitalize transition-all ease-linear hover:bg-base-200">
            <Avatar>
              <AvatarImage src={"/images/personal.png"} />
              <AvatarFallback className="align-center h-full w-full text-center">
                <p className="flex h-full w-full items-center justify-center bg-secondary text-center font-bold">
                  CN
                </p>
              </AvatarFallback>
            </Avatar>
            <span className="text-md">{name}</span>
            {toggle ? <Icon.ChevronUp /> : <Icon.ChevronDown size={16} />}
          </div>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent
        data-theme="dark"
        className="mr-4 w-60 border-0 bg-base-200 p-4 backdrop-blur-sm"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {navList.map((nav) => (
          <Link href={nav.path} key={nav.title}>
            <DropdownMenuItem key={nav.title}>
              {nav.title}
              <DropdownMenuShortcut>{nav.icon}</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span
            className="flex w-full justify-between"
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/sign-in",
              })
            }
          >
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
