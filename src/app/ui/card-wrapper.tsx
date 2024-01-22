import { Fragment } from "react";

import { iCardWrapper } from "@/app/lib/definitions";

export default function CardWrapper({ title, children, action }: iCardWrapper) {
  return (
    <Fragment>
      <div className="flex flex-col rounded-xl p-3 border">
        <div className="flex flex-row justify-between items-center mb-2 h-8">
          <h1 className="text-md font-medium text-slate-500 px-2 text-ellipsis line-clamp-1"> {title} </h1>
          {action}
        </div>
        {children}
      </div>
    </Fragment>
  );
}
