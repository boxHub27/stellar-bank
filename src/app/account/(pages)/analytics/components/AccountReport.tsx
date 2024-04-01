// import React from "react";
"use client";
import { api } from "@/trpc/react";
import React from "react";
import { ClipLoader } from "react-spinners";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { TbReload } from "react-icons/tb";

const AccountReport = () => {
  const { data, isLoading, isError, refetch, failureReason } =
    api.transaction.getAllUserAccount.useQuery();

  const chartData = data?.map((d) => {
    const balance = d.accountBalance;
    return {
      name: d.accountName,
      value: balance,
      dataKey: balance.toLocaleString(),
    };
  });

  // const AccountData = data?.map((d) => {
  //   return {
  //     name: d.accountName,
  //   };
  // });

  const formatValueToLocale = (value: number) => {
    // Assuming the object has a property 'amount' containing the numerical value
    // const numericValue = value; // Defaulting to 0 if 'amount' is not present

    return value.toLocaleString(); // Format the numerical value
  };

  console.log(chartData);
  if (isError) {
    return (
      <div className="flex h-[250px] flex-col items-center justify-center gap-4  text-center text-xs">
        <p>{failureReason?.message}</p>
        <p className="max-w-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed fuga
          mollitia,{" "}
        </p>
        <div
          onClick={() => {
            async function fetch() {
              await refetch();
            }
            fetch;
          }}
          className="btn  no-underline"
        >
          <TbReload size={15} />
          reload
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[250px] items-center justify-center text-sm">
        {/* <p>{fa}</p> */}
        <div className="btn btn-link no-underline">
          <ClipLoader size={10} />
          loading account...
        </div>
      </div>
    );
  }

  return (
    // <div>
    <ResponsiveContainer width="100%" className={"gap-4"} height={250}>
      {/* <div className="grid grid-cols-2"></div> */}
      <PieChart className="grid grid-cols-2 gap-4 ">
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={chartData}
          // cx="50%"
          // cy="50%"
          outerRadius={100}
          fill="#8884d8"
          className="text-xs"
          label={({ value }: { value: number }) =>
            `$${formatValueToLocale(value)}`
          }
        ></Pie>
        <Pie
          dataKey="value"
          data={chartData}
          innerRadius={0}
          outerRadius={80}
          fill="#82ca9d"
        />

        <Tooltip
          labelFormatter={({ payload }: { payload: number }) =>
            formatValueToLocale(payload)
          } // Customizing the label formatter for Tooltip
          content={({ payload }) => {
            if (payload) {
              const data = payload[0]; // Assuming you want data from the first payload item
              // Customize this JSX structure as per your tooltip content requirements
              return (
                <div className="gap-2 rounded-md bg-neutral-50 p-4 text-xs">
                  <p>{`${data?.name}`}</p>
                  <p>{`account bal: $${data?.value?.toLocaleString()}`}</p>
                </div>
              );
            }
            return null; // Return null if no data or payload
          }}
        />
      </PieChart>
    </ResponsiveContainer>
    // </div>
  );
};

export default AccountReport;
