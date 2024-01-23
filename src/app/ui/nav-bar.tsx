import React from "react";

import { PowerIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { signOut } from "@/app/lib/auth";

const links = [
  { label: "Home", path: "./dashboard" },
  { label: "Transactions", path: "./transactions" },
];

export default function NavBar() {
  const userName = "Lorraine";

  return (
    <div className="h-10 flex flex-row justify-between items-center py-1 px-5 shadow-md rounded-xl bg-blue-600 text-white">
      <div className="flex flex-row text-sm">
        {links.map((link, index) => (
          <button key={link.label} type="button" className={clsx({ "border-r pr-2": index < links.length - 1 }, { "px-2": index !== 0 })}>
            {link.label}
          </button>
        ))}
      </div>
      <div className="flex flex-row items-center gap-3">
        <span className="text-sm">Howdy {userName}!</span>
        <button
          type="button"
          title="sign out"
          onClick={async () => {
            "use server";
            await signOut({ redirect: true });
          }}
        >
          <PowerIcon className="h-5 w-6" />
        </button>
      </div>
    </div>
  );
}
