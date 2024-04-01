import React from "react";
import { Skeleton } from "./ui/skeleton";

const AccountSkeleton = () => {
  return (
    <Skeleton className="relative flex h-full min-w-max items-center justify-center bg-base-300 px-8">
      <Skeleton
        className={"absolute right-4 top-4 h-4 w-4 rounded-full bg-base-100"}
      />
      <div className="flex w-32 flex-col gap-4">
        <Skeleton className={" h-2 w-full rounded-full bg-base-100"} />
        <div className="flex w-32 flex-col gap-2">
          <Skeleton className={" h-4 w-full rounded-full bg-base-100"} />
          <Skeleton className={" h-2 w-[80%] rounded-full bg-base-100"} />
        </div>
      </div>
    </Skeleton>
  );
};

export default AccountSkeleton;
