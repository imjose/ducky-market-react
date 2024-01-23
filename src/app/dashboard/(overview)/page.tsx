"use server";

import clsx from "clsx";
import React from "react";

import { fetchLastTransaction, fetchMostExpensiveTransactions, fetchProducts, postTransaction } from "@/app/lib/data";
import { iTransaction } from "@/app/lib/definitions";
import CardWrapper from "@/app/ui/card-wrapper";
import Transaction from "@/app/ui/transaction";

import Products from "./products";

export default async function Page() {
  let [[products, productMap], lastTransaction, mostExpensiveTransaction] = await Promise.all([
    fetchProducts(),
    fetchLastTransaction(),
    fetchMostExpensiveTransactions(),
  ]);

  return (
    <div className="w-full flex flex-row flex-wrap">
      <div className={clsx("w-full p-2", { "md:w-2/3": lastTransaction || mostExpensiveTransaction })}>
        <Products products={products} productMap={productMap} submitTransaction={postTransaction} />
      </div>
      <div className={clsx("w-full md:w-1/3 p-2 flex flex-col gap-4", { "hidden": !lastTransaction && !mostExpensiveTransaction })}>
        <span className={clsx({ "hidden": !lastTransaction })}>
          <CardWrapper title="Last Transaction">
            <Transaction transaction={lastTransaction as iTransaction} productMap={productMap} />
          </CardWrapper>
        </span>

        <span className={clsx({ "hidden": !mostExpensiveTransaction })}></span>
        <CardWrapper title="Most Exprensive Transaction">
          <div className="p-2 flex flex-col items-end text-gray-600">
            <div className="flex flex-row items-end gap-1 font-sans font-semibold">
              <span className="text-2xl">$</span>
              <span className="text-4xl text-ellipsis line-clamp-1  ">{`${(mostExpensiveTransaction as iTransaction).value}.00`}</span>
            </div>
            <span className="text-sm">On: {new Date((mostExpensiveTransaction as iTransaction).createdAt).toDateString()}</span>
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}
