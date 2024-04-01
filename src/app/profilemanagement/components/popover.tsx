import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as Icon from "react-feather";
import AddUser from "./AddUser";

export function PopoverDemo({ title }: { title: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="flex items-center justify-center gap-2  rounded-full text-xs font-normal hover:bg-base-200 dark:border-base-300"
          variant="outline"
        >
          <Icon.Plus size={16} />
          <span>{title}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-9 w-80 bg-base-100 dark:border-base-300 lg:ml-40">
        <AddUser />
      </PopoverContent>
    </Popover>
  );
}
