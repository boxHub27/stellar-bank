import React from "react";
import ProfileDetails from "./component/ProfileDetails";
import { api } from "@/trpc/react";

// type Props = ;

function page() {
  // const [user, setUser] = useState({});

  // const sUser = JSON.stringify(user);

  return (
    <div className="grid p-4 lg:grid-cols-2">
      <ProfileDetails />
    </div>
  );
}

export default page;
