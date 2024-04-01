import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import * as Icon from "react-feather";

function DashBoardCard({
  cardTitle,
  cardDescription,
  contentTitle,
  bgColor,
}: {
  cardTitle: string;
  cardDescription: React.ReactElement;
  contentTitle: string;
  bgColor: string;
}) {
  return (
    <Card className={`${bgColor ? bgColor : "bg-base-300"} z-0 border-0 `}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{cardTitle}</CardTitle>
        <span className="rounded-full bg-slate-50 bg-opacity-30 p-2">
          <Icon.ArrowUpRight
            className="text-error-content"
            size={16}
            strokeWidth={1}
          />
        </span>
      </CardHeader>
      <CardContent>
        <div className=" text-2xl font-semibold">{contentTitle}</div>
        <p className="text-muted-foreground text-xs">{cardDescription}</p>
      </CardContent>
    </Card>
  );
}

export default DashBoardCard;
