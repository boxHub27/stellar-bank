import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { AiOutlineProfile } from "react-icons/ai";
import { FaArrowRightToBracket } from "react-icons/fa6";

const NavBar = () => {
  const { status } = useSession();
  return (
    <nav className="sticky top-0 z-20 w-screen bg-base-100 bg-opacity-80 backdrop-blur-md dark:bg-inherit">
      <div className="navbar w-full justify-between px-10">
        <div className="flex w-full justify-between lg:w-auto ">
          <Link
            href="/"
            className="flex items-center justify-start text-xl normal-case"
          >
            <div className="w-fit">
              <Image
                className="h-10 w-auto object-contain dark:hidden"
                src={"/logoColored1.svg"}
                alt="image"
                width={1000}
                height={1000}
              />
              <Image
                className="hidden h-10 w-auto object-contain dark:flex"
                src={"/logoColored.svg"}
                alt="image"
                width={1000}
                height={1000}
              />
            </div>
          </Link>
          <div className="dropdown mr-5">
            <label tabIndex={0} className="  lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-vertical right-0 z-[1] mt-6 w-64  rounded-md bg-base-100 bg-opacity-30  px-2 text-xs shadow backdrop-blur-lg"
            >
              <li className="">
                <ScrollLink
                  to="hero"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  activeStyle={{
                    // backgroundColor: "transparent",
                    border: "1px solid  ",
                    borderRadius: "0.5rem",
                  }}
                  className="py-4"
                  href="/"
                >
                  Home
                </ScrollLink>
              </li>
              <li className="">
                <ScrollLink
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  activeStyle={{
                    // backgroundColor: "transparent",
                    border: "1px solid  ",
                    borderRadius: "0.5rem",
                  }}
                  className="py-4"
                  href="/services"
                >
                  Services
                </ScrollLink>
              </li>
              <li className="">
                <ScrollLink
                  to="about-us"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  activeStyle={{
                    // backgroundColor: "transparent",
                    border: "1px solid  ",
                    borderRadius: "0.5rem",
                  }}
                  className="py-4"
                  href="/about"
                >
                  Abount
                </ScrollLink>
              </li>
              <li className="">
                <ScrollLink
                  to="contact-us"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  activeStyle={{
                    // backgroundColor: "transparent",
                    border: "1px solid  ",
                    borderRadius: "0.5rem",
                  }}
                  className="py-4"
                  // href="/contact-us"
                >
                  Contact us
                </ScrollLink>
              </li>
              {status == "authenticated" && (
                <Link href={"/account"} className="btn text-xs">
                  Back to Dashboard <FaArrowRightToBracket size={20} />
                </Link>
              )}
              {status == "unauthenticated" && (
                <Link
                  href="/sign-in"
                  target="_blank"
                  className="btn btn-primary "
                >
                  Sign in
                </Link>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-12 px-1 font-light ">
            <li>
              <ScrollLink
                to="hero"
                spy={true}
                activeClass="active"
                default={true}
                smooth={true}
                offset={-100}
                activeStyle={{
                  backgroundColor: "transparent",
                  borderBottom: "2px solid #4a00ff ",
                  borderRadius: "0px",
                  color: "#4a00ff",
                }}
                href="/"
                className="px-0 py-1"
              >
                Home
              </ScrollLink>
            </li>
            <li tabIndex={0}>
              <ScrollLink
                to="services"
                spy={true}
                smooth={true}
                offset={-100}
                activeStyle={{
                  backgroundColor: "transparent",
                  borderBottom: "2px solid #4a00ff ",
                  borderRadius: "0px",
                  color: "#4a00ff",
                }}
                duration={500}
                className="border-primary bg-transparent px-0 py-1"
                href="/services"
              >
                Services
              </ScrollLink>
              {/* <ul className="p-2">
                  <li>
                    <Link href="#">Submenu 9991</Link>
                  </li>
                  <li>
                    <Link href="#">Submenu 2</Link>
                  </li>
                </ul> */}
            </li>
            <li>
              <ScrollLink
                to="about-us"
                spy={true}
                smooth={true}
                offset={-100}
                activeStyle={{
                  backgroundColor: "transparent",
                  borderBottom: "2px solid #4a00ff ",
                  borderRadius: "0px",
                  color: "#4a00ff",
                }}
                href="about-us"
                className="px-0 py-1"
              >
                About us
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="contact-us"
                spy={true}
                smooth={true}
                offset={-100}
                activeStyle={{
                  backgroundColor: "transparent",
                  borderBottom: "2px solid #4a00ff ",
                  borderRadius: "0px",
                  color: "#4a00ff",
                }}
                className="px-0 py-1"
              >
                Contact-us
              </ScrollLink>
            </li>
          </ul>
        </div>
        <div className=" hidden lg:flex">
          {status == "authenticated" && (
            <Link href={"/account"} className="btn text-xs">
              Back to Dashboard <FaArrowRightToBracket size={20} />
            </Link>
          )}
          {status == "unauthenticated" && (
            <Link href="/sign-in" target="_blank" className="btn btn-primary ">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
