import React from "react";

import CardWrapper from "@/app/ui/card-wrapper";
import Products from "./products";

export default function Page() {
  const onSubmitTransaction = () => {};

  return (
    <div className="container flex flex-row flex-wrap">
      <div className="container md:w-2/3 p-2">
        <Products onSubmitTransaction />
      </div>
      <div className="container md:w-1/3 p-2">
        <CardWrapper title="Last Transactions">
          <div></div>
        </CardWrapper>
      </div>
    </div>
  );
}
