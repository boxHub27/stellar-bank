import React from "react";
import { FaCcAmex, FaCcMastercard, FaCcStripe } from "react-icons/fa6";

const Partners = () => {
  return (
    <div className="flex gap-16 py-16">
      <FaCcMastercard
        className=" shadow-xl transition duration-75 ease-linear hover:scale-110 hover:text-primary hover:shadow-2xl hover:shadow-primary"
        size={60}
      />
      <FaCcStripe
        className="transition duration-75 ease-linear hover:scale-110 hover:text-primary hover:shadow-2xl hover:shadow-primary"
        size={60}
      />
      <FaCcAmex
        className="transition duration-75 ease-linear hover:scale-110 hover:text-primary hover:shadow-2xl hover:shadow-primary"
        size={60}
      />
    </div>
  );
};

export default Partners;
