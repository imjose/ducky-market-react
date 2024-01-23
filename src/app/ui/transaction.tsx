"use client";

import { User } from "next-auth";
import React from "react";

import { iProduct, iTransaction } from "@/app/lib/definitions";

export default function Transaction({
  user,
  transaction,
  productMap,
}: {
  user: User | undefined;
  transaction: iTransaction;
  productMap: Map<string, iProduct>;
}) {
  return (
    <div className="font-mono text-sm flex flex-col p-2">
      <span>By: {user?.name}</span>
      <span>On: {transaction?.createdAt.toLocaleString()}</span>
      <span>Total Items: {Object.values(transaction?.products).reduce((prev, c) => (prev += c), 0)}</span>
      <span className="pt-2">Product List:</span>
      <div className="pl-4 flex flex-col">
        {Object.entries(transaction?.products).map(([id, quantity]) => (
          <span className="text-ellipsis line-clamp-1" key={id}>
            {`${quantity}x - ${productMap.get(id)?.title}`}{" "}
          </span>
        ))}
      </div>
      <span className="pt-2">{`Transaction Totals: $${transaction.value}.00`}</span>
    </div>
  );
}
