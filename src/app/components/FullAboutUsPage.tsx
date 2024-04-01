"use client";
import { IconContext } from "react-icons";
import { Icon } from "@iconify/react";
import { ChevronRight } from "react-feather"; // Replace with your desired react-icons or Iconify icons

const AboutUsPage = () => {
  // Dummy content for demonstration
  const historyContent = `Established in 1980, Stellar Bank has been a trusted financial institution dedicated to delivering exceptional services to our customers. Our journey began with a mission to redefine banking by offering innovative solutions and personalized experiences.`;

  const visionContent = `At Stellar Bank, our vision is to empower individuals and businesses by providing comprehensive financial solutions. We aim to foster strong relationships, understand our customers' unique needs, and deliver tailored services that exceed expectations. We specialize in offering competitive interest rates, helping you save and grow your money.`;

  const coreValues = [
    "Integrity",
    "Innovation",
    "Customer-Centricity",
    "Community Engagement",
  ];

  return (
    <div className=" grid w-full gap-16 p-6 px-4 py-16 md:px-32  lg:grid-cols-2">
      <div className="flex flex-col gap-12 md:flex-row lg:flex-col">
        <div className="">
          <h2 className="mb-4 text-3xl font-bold">Our History</h2>
          <p className="">{historyContent}</p>
        </div>
        <div className="">
          <h2 className="mb-4 text-3xl font-bold">Our Vision</h2>
          <p className="">{visionContent}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-bold">Core Values</h2>
        <ul className="flex flex-col gap-8  text-primary md:flex-row ">
          {coreValues.map((value, index) => (
            <li key={index} className="text-xs">
              <IconContext.Provider value={{ size: "1.2em" }}>
                <span>{">"} </span>
                {/* <Icon icon="mdi:chevron-right" /> */}
              </IconContext.Provider>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutUsPage;
