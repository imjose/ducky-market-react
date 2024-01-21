import { Fragment } from "react";

import NavBar from "@/app/ui/nav-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <div className="mb-4 px-2">
        <NavBar />
      </div>
      <div>{children}</div>
    </Fragment>
  );
}
