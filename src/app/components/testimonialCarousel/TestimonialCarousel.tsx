"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbSquareDotFilled } from "react-icons/tb";

const TestimonialCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const testimonial = [
    {
      rating: 5,
      testimony:
        "I've been banking with them for years, and I can confidently say they're the best in the business. Their commitment to helping customers achieve their financial goals is unmatched. The staff is friendly, knowledgeable, and always ready to assist. I highly recommend their services!",
      name: "Sarah Johnson",
      image: "sarah-johnson.jpg",
      OD: {
        companyName: "Global Investments Inc.",
        position: "Senior Financial Analyst",
      },
    },
    {
      rating: 5,
      testimony:
        "Choosing this bank was one of the best decisions I've made. Their dedication to customer satisfaction is evident in every interaction. The online banking experience is seamless, and their financial advisors provided me with invaluable advice. I'm extremely satisfied with their services.",
      name: "Michael Anderson",
      image: "michael-anderson.jpg",
      OD: {
        companyName: "Rone Constructions",
        position: "Investment Advisor",
      },
    },
    {
      rating: 3,
      testimony:
        "I've had an amazing experience with this bank. Their professionalism and expertise are exceptional. The savings plans they offer are tailored to suit individual needs. The customer service team is highly responsive and goes above and beyond to assist customers. Highly recommended!",
      name: "Emily Clark",
      image: "emily-clark.jpg",
      OD: {
        companyName: "tol Capital Group",
        position: "Financial Planner",
      },
    },
    {
      rating: 4,
      testimony:
        "I've found this bank to be incredibly reliable. Their financial products are diverse, and their rates are competitive. I've had nothing but positive experiences with their customer service team, who are always willing to help. I'm confident in recommending their services.",
      name: "David Rodriguez",
      image: "david-rodriguez.jpg",
      OD: {
        companyName: "Investment Partners Ltd.",
        position: "Account Manager",
      },
    },
    {
      rating: 5,
      testimony:
        "This bank has exceeded my expectations in every way. Their commitment to transparency and customer satisfaction is commendable. The support provided by their financial advisors is invaluable. I'm extremely satisfied with their services and would recommend them without hesitation.",
      name: "Sophia Carter",
      image: "sophia-carter.jpg",
      OD: {
        companyName: "Finance Alliance Group",
        position: "Financial Consultant",
      },
    },
  ];
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span className="text-primary" key={i}>
          ★
        </span>,
      );
    }
    return stars;
  };

  const counterState = (count: number, current: number) => {
    const Dots = [];

    for (let i = 0; i < count; i++) {
      Dots.push(
        <span
          className={`${current == i + 1 && "text-primary"} flex text-4xl `}
          // onClick={() => setCurrent(i + 1)}
        >
          <TbSquareDotFilled size={15} />
        </span>,
      );

      console.log(i + 1);
    }
    return Dots;
  };

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      console.log("current");
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="w-full px-12">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {testimonial.map((test, index) => (
            <CarouselItem
              className="h-fit items-center justify-center md:basis-1/2 xl:basis-1/3 "
              key={index}
            >
              <Card className="border transition duration-150 ease-linear hover:border-primary hover:shadow-inner hover:shadow-primary">
                <CardContent className="flex  aspect-square flex-col gap-4 p-6">
                  <div>
                    <span>{renderStars(test.rating)}</span>
                  </div>
                  <div>
                    <p className="font-light">{test.testimony}</p>
                  </div>

                  <div className="flex items-start justify-center gap-4">
                    <Avatar>
                      <AvatarImage src="/images/personal.png" />
                      <AvatarFallback />
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold">{test.name}</p>
                      <p className="text-xs text-opacity-10">
                        <span>{test.OD.companyName}</span>,{" "}
                        <span>{test.OD.position}</span>
                      </p>
                    </div>
                  </div>
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-base-300 hover:bg-primary" />
        <CarouselNext className="border-base-300 hover:bg-primary" />
      </Carousel>
      <div className="text-muted-foreground flex items-center justify-center gap-4 py-2 text-center text-sm">
        {/* Slide {current} of {count} */}
        {counterState(count, current)}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
