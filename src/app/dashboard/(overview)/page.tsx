import React from "react";

import { fetchLastTransaction, fetchMostExpensiveTransactions, fetchProducts, postTransaction } from "@/app/lib/data";
import CardWrapper from "@/app/ui/card-wrapper";

import Products from "./products";

export default async function Page() {
  let [products, lastTransaction, mostExpensiveTransaction] = await Promise.all([
    fetchProducts(),
    fetchLastTransaction(),
    fetchMostExpensiveTransactions(),
  ]);

  return (
    <div className="w-full flex flex-row flex-wrap">
      <div className="w-full md:w-2/3 p-2">
        <Products products={products} submitTransaction={postTransaction} />
      </div>
      <div className="w-full md:w-1/3 p-2 flex flex-col gap-4">
        <CardWrapper title="Last Transaction">
          <div className="p-3">{JSON.stringify(lastTransaction)}</div>
        </CardWrapper>

        <CardWrapper title="Most Exprensive Transaction">
          <div className="p-3">{JSON.stringify(mostExpensiveTransaction)}</div>
        </CardWrapper>
      </div>
    </div>
  );
}
