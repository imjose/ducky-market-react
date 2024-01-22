import { iProduct } from "./definitions";

export function fetchProducts(): Promise<iProduct[]> {
  return fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(res => res.products);
}

export function fetchTransactions(/* userId */) {
  /* logic .. */
  //

  return new Promise((res, rej) => res([]));
}
