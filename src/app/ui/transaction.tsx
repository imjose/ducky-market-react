"use server";

import React from "react";

import { auth } from "@/app/lib/auth";
import { iProduct, iTransaction } from "@/app/lib/definitions";

export default async function Transaction({ transaction, productMap }: { transaction: iTransaction; productMap: Map<string, iProduct> }) {
  const session = await auth();

  return (
    <div className="font-mono text-sm flex flex-col p-2">
      <span>By: {session?.user?.name}</span>
      <span>On: {transaction?.createdAt.toLocaleString()}</span>
      <span>Total Items: {Object.values(transaction?.products).reduce((prev, c) => (prev += c), 0)}</span>
      <span className="pt-2">Product List:</span>
      <div className="pl-4 flex flex-col">
        {Object.entries(transaction?.products).map(([id, quantity]) => (
          <span key={id}>{`${quantity}x - ${productMap.get(id)?.title}`} </span>
        ))}
      </div>
      <span className="pt-2">{`Transaction Totals: $${transaction.value}.00`}</span>
    </div>
  );
}
