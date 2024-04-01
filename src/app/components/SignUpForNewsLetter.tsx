import React from "react";

import NewsLetterForm from "./NewsLetterForm";

const SignUpForNewsLetter = () => {
  return (
    <div className="newsLetter-img flex h-fit w-full items-center justify-center bg-primary object-contain px-4 py-16 text-white md:px-32">
      <div className="space-y-8 ">
        <div className="space-y-1 text-center">
          <h1 className="text-4xl font-bold">
            SignUp for our <span className="">Newsletter</span>
          </h1>
          <p>📩 Stay Ahead with Exclusive Updates </p>
        </div>
        <NewsLetterForm />
      </div>
    </div>
  );
};

export default SignUpForNewsLetter;
