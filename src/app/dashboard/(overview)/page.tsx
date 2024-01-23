"use server";

import { auth } from "@/app/lib/auth";
import { fetchLastTransaction, fetchMostExpensiveTransaction, fetchProducts, postTransaction } from "@/app/lib/data";
import NavBar from "@/app/ui/nav-bar";

import Dashboard from "./dashboard/dashboard";

export default async function Page() {
  const session = await auth();

  let [[products, productMap], lastTransaction, mostExpensiveTransaction] = await Promise.all([
    fetchProducts(),
    fetchLastTransaction(),
    fetchMostExpensiveTransaction(),
  ]);

  return (
    <main className="p-5 max-w-5xl mx-auto">
      <div className="mb-4 px-2">
        <NavBar name={session?.user?.name ?? "User"} />
      </div>
      <Dashboard
        user={session?.user}
        products={products}
        productMap={productMap}
        lastTransaction={lastTransaction}
        mostExpensiveTransaction={mostExpensiveTransaction}
        postTransaction={postTransaction}
      />
    </main>
  );
}
