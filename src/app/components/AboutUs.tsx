"use client";
import Image from "next/image";
import React from "react";
import { BiBullseye } from "react-icons/bi";
import AboutUsPage from "./FullAboutUsPage";
import { FaArrowUp } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";

function AboutUs() {
  const [more, setMore] = React.useState(false);
  const [scrollId, setScrollId] = React.useState("");

  function openMoreAbout() {
    setMore(!more);
    setScrollId("more-about");
  }
  return (
    <div id="about-us" className="grid w-full bg-base-300 px-4 py-16 ">
      <div className="grid md:px-32 lg:grid-cols-2">
        <div className="flex flex-col gap-16">
          <div className="grid gap-5">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold">
                Committed to Your Financial{" "}
                <span className="text-primary">Confidence,</span>{" "}
                <span className="">Always</span>
              </h1>
              <p className="text-sm font-light">
                Welcome to our world of financial empowerment! We believe in
                transforming possibilities into realities, offering seamless
                experiences for every step in your financial journey. Our
                commitment to innovation and expertise ensures that you always
                thrive.
              </p>
            </div>
            <div className="flex flex-col items-start gap-16">
              <div className="flex flex-row items-start justify-center gap-2">
                <div className="text-primary">
                  <BiBullseye size={25} />
                </div>
                <div className="">
                  <h1 className="text-xl font-semibold text-primary">
                    Our Goal
                  </h1>
                  <p className="m max-w-lg text-sm font-normal">
                    To revolutionize banking by fostering financial well-being
                    through accessible, innovative, and personalized solutions.
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-start justify-center gap-2">
                <div className="text-primary">
                  <BiBullseye size={25} />
                </div>
                <div className="">
                  <h1 className="text-xl font-semibold text-primary">
                    Our Vison
                  </h1>
                  <p className="m max-w-lg text-sm font-normal">
                    Creating a future where banking transcends boundaries,
                    empowering individuals and businesses to achieve their
                    aspirations effortlessly. At Stellar Bank, we believe in
                    simplifying financial solutions and breaking barriers to
                    make banking accessible for everyone.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div
                onClick={openMoreAbout}
                // to={`${scrollId ? scrollId : ""}`}
                // spy={true}
                // smooth={true}
                // offset={-100}
                // duration={500}
                className="btn btn-primary cursor-pointer"
              >
                {more ? (
                  <>
                    show less
                    <IoIosArrowUp />
                  </>
                ) : (
                  <>
                    read more
                    <IoIosArrowDown />
                  </>
                )}
                {/* more about us */}
              </div>
            </div>
          </div>
          {/* <div></div> */}
        </div>
        {more && (
          <div
            id="more-about"
            className="w-full transition duration-75 ease-linear md:hidden"
          >
            <AboutUsPage />
          </div>
        )}
        <div className="flex items-center justify-center">
          <div>
            <Image
              width={1000}
              height={1000}
              src={"/images/aboutImg.png"}
              alt="image"
              className="scale-x-[-1] transform"
            />
          </div>
        </div>
      </div>
      {more && (
        <div
          id="more-about"
          className="hidden w-full transition duration-75 ease-linear md:block"
        >
          <AboutUsPage />
        </div>
      )}
    </div>
  );
}

export default AboutUs;
