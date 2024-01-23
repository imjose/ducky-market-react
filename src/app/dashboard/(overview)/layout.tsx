"use server";

import { auth } from "@/app/lib/auth";
import { fetchLastTransaction, fetchMostExpensiveTransactions, fetchProducts, postTransaction } from "@/app/lib/data";
import { iTransaction } from "@/app/lib/definitions";
import NavBar from "@/app/ui/nav-bar";

import Page from "./page";

export default async function Layout() {
  const session = await auth();

  let [[products, productMap], lastTransaction, mostExpensiveTransaction] = await Promise.all([
    fetchProducts(),
    fetchLastTransaction(),
    fetchMostExpensiveTransactions(),
  ]);

  return (
    <main className="p-5 max-w-5xl mx-auto">
      <div className="mb-4 px-2">
        <NavBar name={session?.user?.name ?? "User"} />
      </div>
      <Page
        user={session?.user}
        products={products}
        productMap={productMap}
        lastTransaction={lastTransaction as iTransaction | undefined}
        mostExpensiveTransaction={mostExpensiveTransaction as iTransaction | undefined}
        postTransaction={postTransaction}
      />
    </main>
  );
}
