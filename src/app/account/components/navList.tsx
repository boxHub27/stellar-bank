import Link from "next/link";
import path from "path";
import React from "react";
import * as Icon from "react-feather";

const NavList = ({
  icon,
  title,
  path,
  active,
}: {
  path: string;
  title: string;
  active: boolean;
  icon: React.ReactElement;
}) => {
  return (
    <li className={`${active && "rounded-md bg-base-300"} text-xs`}>
      <Link href={path && path} className="flex py-3">
        <span className="text-primary">{icon}</span>
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default NavList;
