import React, { Fragment } from "react";

export type Product = {
  id?: string;
  name: string;
  description: string;

  // internally added
  children?: React.ReactNode;
};

export default function Product({ name, description, children }: Product) {
  return (
    <div className="container flex p-2 gap-2">
      <div className="w-12 h-12 flex-shrink-0 bg-slate-200 rounded-xl" />
      <div className="flex flex-row flex-grow justify-between content-center">
        <div className="flex flex-col items-start gap-1">
          <div className="text-ellipsis line-clamp-1"> {name} </div>
          <p className="text-sm text-ellipsis line-clamp-2"> {description} </p>
        </div>
        {children}
      </div>
    </div>
  );
}
