import { iProduct } from "./definitions";

import prisma from "./db";

export function fetchProducts(): Promise<iProduct[]> {
  return fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(res => res.products);
}

export function fetchTransactions() {
  // resolve userId from session

  // prisma.transaction.findMany({
  //   where: { userId }
  // });

  return new Promise((res, rej) => res([]));
}
