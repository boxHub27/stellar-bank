"use client";
import UnauthorizedComponent from "@/components/UnAuthorized";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { date } from "zod";

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();
  // if (session?.user.role == "USER") {
  //   return (
  //     <>
  //       <UnauthorizedComponent />
  //     </>
  //   );
  //   router.push("/account");
  // }
  // if (session?.user.role != "PROFILEMANAGER" || "ADMIN") {
  //   router.push("/sign-in");
  // }
  return <div>{children}</div>;
};

export default AuthChecker;
