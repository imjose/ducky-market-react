import React from "react";

import CardWrapper from "@/app/ui/card-wrapper";
import Products from "./products";
import { fetchProducts, fetchTransactions } from "@/app/lib/data";

async function onSubmitTransaction(selectedProducts: { [key: string]: number }) {
  "use server";

  // submit transaction
  console.log(selectedProducts);
}

export default async function Page() {
  const [products, transactions] = await Promise.all([fetchProducts(), fetchTransactions()]);

  return (
    <div className="w-full flex flex-row flex-wrap">
      <div className="w-full md:w-2/3 p-2">
        <Products products={products} submitTransaction={onSubmitTransaction} />
      </div>
      <div className="w-full md:w-1/3 p-2">
        <CardWrapper title="Last Transactions">
          <div></div>
        </CardWrapper>
      </div>
    </div>
  );
}
