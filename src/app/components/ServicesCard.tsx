import React from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";
import { GiPayMoney } from "react-icons/gi";

const ServicesCard = () => {
  return (
    <div
      id="services"
      className="grid w-full grid-cols-2 place-items-center gap-4 px-4 py-16 md:px-32 lg:grid-cols-4"
    >
      <Items
        className=""
        Icon={<FaMoneyBillTrendUp strokeWidth={1} size={50} />}
        title="Money Transfer"
      />
      <Items
        className="bg-primary text-white"
        Icon={<TbPigMoney strokeWidth={1} size={50} />}
        title="Save Money"
      />
      <Items
        className=""
        Icon={<BiMoneyWithdraw size={50} />}
        title="Withdraw"
      />
      <Items
        className=""
        Icon={<GiPayMoney size={50} />}
        title="Bank Deposit"
      />
    </div>
  );
};

type ItemsProp = {
  className: string;
  Icon: React.ReactElement;
  title: string;
};

function Items({ className, Icon, title }: ItemsProp) {
  return (
    <div
      className={` ${className} card w-full place-items-center gap-4  p-4 py-16 shadow-md`}
    >
      {Icon}
      <span>{title}</span>
    </div>
  );
}

export default ServicesCard;
