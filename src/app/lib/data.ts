"use server";

import { auth } from "./auth";
import prisma from "./db";
import { iProduct, iTransaction } from "./definitions";

export async function fetchProducts(): Promise<[iProduct[], Map<string, iProduct>]> {
  return fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(res => [res.products, new Map<string, iProduct>(res.products.map((_p: iProduct) => [_p.id.toString(), _p]))]);
}

export async function fetchLastTransaction(): Promise<iTransaction | undefined> {
  const session = await auth();

  if (!session?.user?.email) return;

  return prisma.user
    .findUnique({
      where: { email: session.user.email },
      include: { Transaction: { orderBy: { createdAt: "desc" }, take: 1 } },
    })
    .then(val => val?.Transaction?.[0] as iTransaction);
}

export async function fetchTransactions() {
  const session = await auth();

  if (!session?.user?.email) return [];

  return prisma.user
    .findUnique({
      where: { email: session.user.email },
      include: { Transaction: true },
    })
    .then(val => val?.Transaction ?? []);
}

export async function fetchMostExpensiveTransaction(): Promise<iTransaction | undefined> {
  const session = await auth();

  if (!session?.user?.email) return;

  return prisma.user
    .findUnique({
      where: { email: session.user.email },
      include: { Transaction: { orderBy: { value: "desc" }, take: 1 } },
    })
    .then(val => val?.Transaction?.[0] as iTransaction);
}

export async function postTransaction(products: { [key: string]: number }, totalAmount: number): Promise<iTransaction | undefined> {
  const session = await auth();

  const user = await prisma.user.findUnique({ where: { email: session?.user?.email ?? "" }, select: { id: true } });
  if (!user) return;

  const res = await prisma.transaction.create({
    data: { userId: user.id, products, value: totalAmount },
  });

  return res as iTransaction;
}
