import { PhoneIcon } from "lucide-react";
import React from "react";

const InfoComponent = () => {
  return (
    <div>
      <div className="flex gap-4">
        <Info title="" icon={<PhoneIcon size={15} />} />
        <Info title="" icon={<PhoneIcon size={15} />} />
        <Info title="" icon={<PhoneIcon size={15} />} />
      </div>
    </div>
  );
};

export const Info = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div>
      <p className="flex items-center justify-center gap-4 text-xs">
        <span>
          <PhoneIcon size={15} />
        </span>
        <span>+1 354 789 9339</span>
      </p>
    </div>
  );
};

export default InfoComponent;
