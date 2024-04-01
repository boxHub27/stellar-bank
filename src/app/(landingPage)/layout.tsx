import React from "react";
import NavHolder from "../components/NavHolder";

function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavHolder />
      {children}
    </div>
  );
}

export default PagesLayout;
