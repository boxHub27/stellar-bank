import React from "react";
import TestimonialCarousel from "./testimonialCarousel/TestimonialCarousel";

const Testimonial = () => {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-16 md:px-32 ">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-center text-4xl font-bold">
          Users <span className="text-primary ">testimonials</span>
        </h1>
        {/* <p className="text-center text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p> */}
      </div>
      <div className="w-full">
        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default Testimonial;
