"use server";

import { auth } from "./auth";
import prisma from "./db";
import { iProduct } from "./definitions";

export async function fetchProducts(): Promise<[iProduct[], Map<string, iProduct>]> {
  return fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(res => [res.products, new Map<string, iProduct>(res.products.map((_p: iProduct) => [_p.id.toString(), _p]))]);
}

export async function fetchLastTransaction() {
  const session = await auth();

  if (!session?.user?.email) return [];

  return prisma.user
    .findUnique({
      where: { email: session.user.email },
      include: { Transaction: { orderBy: { createdAt: "desc" }, take: 1 } },
    })
    .then(val => val?.Transaction?.[0]);
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

export async function fetchMostExpensiveTransactions() {
  const session = await auth();

  if (!session?.user?.email) return [];

  return prisma.user
    .findUnique({
      where: { email: session.user.email },
      include: { Transaction: { orderBy: { value: "desc" }, take: 1 } },
    })
    .then(val => val?.Transaction?.[0]);
}

export async function postTransaction(products: { [key: string]: number }, totalAmount: number) {
  const session = await auth();

  const user = await prisma.user.findUnique({ where: { email: session?.user?.email ?? "" }, select: { id: true } });
  if (!user) return;

  await prisma.transaction.create({
    data: { userId: user.id, products, value: totalAmount },
  });
}
