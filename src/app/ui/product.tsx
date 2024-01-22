import React from "react";

import { iProduct } from "@/app/lib/definitions";

export default function Product({ title, description, children }: Partial<iProduct>) {
  return (
    <div className="w-full flex p-2 gap-2">
      <div className="w-12 h-12 flex-shrink-0 bg-slate-200 rounded-xl"></div>
      <div className="flex flex-row flex-grow justify-between content-center">
        <div className="flex flex-col items-start gap-1">
          <div className="text-ellipsis line-clamp-1"> {title} </div>
          <p className="text-sm text-ellipsis line-clamp-2"> {description} </p>
        </div>
        {children}
      </div>
    </div>
  );
}
