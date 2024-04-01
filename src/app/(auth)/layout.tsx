import Image from "next/image";
import Provider from "@/components/Provider";
export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <section>
        <main data-theme={"forest"} className=" flex h-screen w-screen ">
          <div className="flex w-full items-center justify-center  md:w-1/2">
            {" "}
            {/* <Form /> */}
            {children}
          </div>
          <div className="relative hidden w-1/2 bg-secondary  md:flex">
            <div className="absolute left-0 top-0 z-10 h-full w-full bg-secondary bg-opacity-25" />
            <Image
              width={1000}
              className=" h-full w-full bg-cover object-cover"
              height={1000}
              alt="image"
              src="/images/image1.jpg"
            ></Image>
          </div>
        </main>
        {/* <FormHolder /> */}
      </section>
    </Provider>
  );
}
