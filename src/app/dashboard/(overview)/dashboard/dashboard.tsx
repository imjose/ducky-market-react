"use client";

import clsx from "clsx";
import { User } from "next-auth";
import React, { useRef, useState } from "react";

import { iProduct, iTransaction } from "@/app/lib/definitions";
import CardWrapper from "@/app/ui/card-wrapper";
import Transaction from "@/app/ui/transaction";

import Products from "./products";

export default function Dashboard({
  user,
  products,
  productMap,
  lastTransaction,
  mostExpensiveTransaction,
  postTransaction,
}: {
  user: User | undefined;
  products: iProduct[];
  productMap: Map<string, iProduct>;
  lastTransaction: iTransaction | undefined;
  mostExpensiveTransaction: iTransaction | undefined;
  postTransaction: (selectedProducts: { [key: string]: number }, totalAmount: number) => Promise<iTransaction | undefined>;
}) {
  const mostExtpensiveTransactionRef = useRef(mostExpensiveTransaction);

  const generateTransactionNode = (transaction: iTransaction | undefined) =>
    transaction && (
      <CardWrapper title="Last Transaction">
        <Transaction user={user} transaction={transaction} productMap={productMap} />
      </CardWrapper>
    );

  const generateMostExpensiveTransactionNode = (transaction: iTransaction | undefined) =>
    transaction && (
      <CardWrapper title="Most Exprensive Transaction">
        <div className="p-2 flex flex-col items-end text-gray-600">
          <div className="flex flex-row items-end gap-1 font-sans font-semibold">
            <span className="text-2xl">$</span>
            <span className="text-4xl text-ellipsis line-clamp-1  ">{`${transaction.value}.00`}</span>
          </div>
          <span className="text-sm">On: {new Date(transaction.createdAt).toDateString()}</span>
        </div>
      </CardWrapper>
    );

  function onSubmitTransaction(selectedProducts: { [key: string]: number }, totalAmount: number) {
    postTransaction(selectedProducts, totalAmount).then(generatedTransaction => {
      setlastTransactionNode(generateTransactionNode(generatedTransaction));

      if (generatedTransaction && generatedTransaction.value > (mostExtpensiveTransactionRef.current?.value ?? 0)) {
        mostExtpensiveTransactionRef.current = generatedTransaction;
        setMostExpensiveTransactionNode(generateMostExpensiveTransactionNode(mostExtpensiveTransactionRef.current));
      }
    });
  }

  const [lastTransactionNode, setlastTransactionNode] = useState(generateTransactionNode(lastTransaction));
  const [mostExpensiveTransactionNode, setMostExpensiveTransactionNode] = useState(
    generateMostExpensiveTransactionNode(mostExtpensiveTransactionRef.current)
  );

  return (
    <div className="w-full flex flex-row flex-wrap">
      <div className={clsx("w-full p-2", { "md:w-2/3": lastTransactionNode || mostExpensiveTransactionNode })}>
        <Products products={products} productMap={productMap} submitTransaction={onSubmitTransaction} />
      </div>
      <div className={clsx("w-full md:w-1/3 p-2 flex flex-col gap-4", { "hidden": !lastTransactionNode && !mostExpensiveTransactionNode })}>
        {lastTransactionNode}
        {mostExpensiveTransactionNode}
      </div>
    </div>
  );
}
