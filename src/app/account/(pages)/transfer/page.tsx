import React from "react";
import TransactionList from "../../components/TransactionList";
import AccountReport from "../analytics/components/AccountReport";
import InfoComponent from "../../components/InfoComponent";
import TransferComponent from "../../components/TransferComponent";

const page = () => {
  const date = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toDateString();

  return (
    <div className="relative px-4 py-2">
      <div className="card grid">
        <div className="grid gap-2 lg:grid-cols-6 ">
          <div className="card col-span-6 flex items-center justify-between gap-2 border border-base-300 py-0 md:col-span-2">
            <div className="card w-full border border-base-100">
              <TransferComponent />
            </div>
            <div className="card w-full border border-base-300">
              <AccountReport />
            </div>
          </div>
          <div className="col-span-6 grid w-full gap-2 md:col-span-4">
            <div className="card w-full  bg-base-200 md:col-span-4">
              <div className="textsm bg-base-300 px-4 py-4 font-semibold">
                <h1>Scheduled</h1>
              </div>
              {/* <div className="bg-base-200 px-4 py-4 text-xs">
                <p>updated at</p>
              </div> */}
              <div className="border-l-8 border-l-blue-800 bg-cyan-200 px-4 py-4 text-xs text-black">
                <p>
                  For Bill Support, please contact us at (884) 787 1562
                  Available Mon-Fri 7:00 AM- 1:00AM CT
                </p>
              </div>
            </div>
            <div className="card h-full w-full gap-4 border border-base-300 px-4  py-8 md:col-span-4">
              <div className="flex w-full justify-between">
                <p className="">Transaction History</p>
                <p className="text-xs opacity-95 ">Updated: {formattedDate}</p>
              </div>
              <div className="h-80 overflow-scroll">
                <TransactionList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
