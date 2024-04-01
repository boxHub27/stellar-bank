"use client";
import { Link as ScrollLink } from "react-scroll";
function Heror() {
  return (
    <div
      id="hero"
      // style={{ backgroundImage: "url(/images/heror.jpg)" }}
      className={`bg  heror-img h-[40rem] w-screen bg-cover bg-center  object-cover px-8  md:px-16`}
    >
      <div
        id="ColumnRoot"
        className="flex w-full flex-col items-start gap-10 md:w-1/2"
      >
        <div className="flex w-full flex-col items-start gap-6">
          <div>
            <span className="text-white">
              welcome to <span className="text-accent">Stellar Bank</span>
            </span>
          </div>
          <div
            id="Heading"
            className="w-full text-4xl font-bold text-white lg:text-5xl lg:leading-[67.2px]"
          >
            Take control on your daily expenses
          </div>
          <div
            id="Text1"
            className="w-3/4 text-xs font-light  text-white md:text-sm md:leading-[27px]"
          >
            At{" "}
            <span className="text-white  lg:rounded-full lg:border lg:border-primary lg:p-2 lg:backdrop-blur-2xl">
              Stellar Bank
            </span>
            , we understand the significance of managing daily expenses. Our
            comprehensive suite of financial solutions is designed to empower
            individuals and businesses to take{" "}
            <span className="text-white  lg:rounded-full lg:border lg:border-accent lg:p-2 lg:backdrop-blur-2xl">
              control
            </span>{" "}
            of their expenses efficiently.
          </div>
        </div>
        <ScrollLink
          to="application-form"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          id="Button2"
          className="btn btn-primary"
        >
          Apply for an Account
        </ScrollLink>
      </div>

      {/* <div className="relative w-full bg-gradient-to-b from-base-100 to-secondary">
        <section className="overflow-hidden">
          <div className="flex flex-col px-8 lg:flex-row lg:items-stretch">
            <div className="flex w-full items-center justify-center p-8 lg:order-2 lg:w-7/12">
              <div className="h-full">
                <div className="flex h-full flex-1 flex-col justify-between">
                  <div className="space-y-4">
                    <span>
                      welcome to{" "}
                      <span className="text-secondary">Stellar Bank</span>
                    </span>
                    <h1 className="text-4xl font-black  dark:text-white  sm:text-6xl xl:text-7xl">
                      Take control <br />
                      on your daily expenses
                    </h1>
                    <p className=" text-base sm:text-xl">
                      Our A.I helps you to predict your expenses based on your
                      previous activity and shares how you should manage you
                      money.
                    </p>
                    <a
                      href="#"
                      title=""
                      className="btn btn-primary mt-10"
                      role="button"
                    >
                      Get started for free{" "}
                    </a>
                  </div>

                  <div className="mt-8 border-t-2 border-black sm:mt-14 lg:mt-auto">
                    <div className="pt-8 sm:flex sm:items-center sm:justify-between sm:pt-14">
                      <p className="text-base font-semibold text-black">
                        App available on
                      </p>

                      <div className="mt-5 flex items-center space-x-5 sm:mt-0">
                        <a
                          href="#"
                          title=""
                          className="block transition-all duration-200 hover:opacity-80 focus:opacity-80"
                          role="button"
                        >
                          <img
                            className="h-14 w-auto rounded sm:h-16"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/app-store-button.png"
                            alt=""
                          />
                        </a>

                        <a
                          href="#"
                          title=""
                          className="block transition-all duration-200 hover:opacity-80 focus:opacity-80"
                          role="button"
                        >
                          <img
                            className="h-14 w-auto rounded sm:h-16"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/play-store-button.png"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full overflow-hidden lg:order-1 lg:w-5/12">
              <div className="lg:absolute lg:bottom-0 lg:left-0">
                <img
                  className="w-full"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/phone-mockup.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div> */}
    </div>
  );
}

export default Heror;
