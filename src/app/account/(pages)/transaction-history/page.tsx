import React from "react";
import TransactionList from "../../components/TransactionList";

const page = () => {
  return (
    <div className="card relative h-auto p-4">
      <div className="sticky left-0 top-0 my-3 text-xs ">
        recent transactions
      </div>
      <div className="h-auto">
        <TransactionList />
      </div>
    </div>
  );
};

export default page;
