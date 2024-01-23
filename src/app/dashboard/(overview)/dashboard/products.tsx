"use client";

import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import { iProduct } from "@/app/lib/definitions";
import CardWrapper from "@/app/ui/card-wrapper";
import Product from "@/app/ui/product";
import ProductStepper from "@/app/ui/product-stepper";

export default function Products({
  products,
  productMap,
  submitTransaction,
}: {
  products: iProduct[];
  productMap: Map<string, iProduct>;
  submitTransaction: (selectedProducts: { [key: string]: number }, totalAmount: number) => void;
}) {
  const totalAmount = useRef<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    totalAmount.current = Object.entries(selectedProducts).reduce(
      (prev, [id, quantity]) => (prev += (productMap.get(id)?.price ?? 0) * quantity),
      0
    );
  }, [selectedProducts, productMap]);

  const addTransaction = (
    <button
      type="button"
      onClick={() => {
        submitTransaction(selectedProducts, totalAmount.current);
        setSelectedProducts({});
      }}
      className={clsx(
        "flex items-center justify-center rounded-md h-8 py-1 px-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white",
        { "hidden": !Object.keys(selectedProducts).length }
      )}
    >
      <span>Submit Transaction</span>
    </button>
  );

  const selectProduct = (id: string) => {
    if (selectedProducts[id]) return;

    setSelectedProducts(prev => ({ ...prev, [id]: 1 }));
  };

  return (
    <CardWrapper title="Products" action={addTransaction}>
      <ul className="overflow-auto max-h-[560px]">
        {products.map(({ id, title, description, category }, index) => (
          <>
            <li
              key={id}
              onClick={() => selectProduct(id.toString())}
              className={clsx(
                "cursor-pointer rounded-lg",
                { "hover:bg-slate-200 text-slate-600": !Object.hasOwn(selectedProducts, id) },
                { "text-white bg-violet-600 hover:bg-violet-500 cursor-default": Object.hasOwn(selectedProducts, id) }
              )}
            >
              <Product title={title} description={description} category={category}>
                <div className={clsx({ "hidden": !Object.hasOwn(selectedProducts, id) })}>
                  <ProductStepper id={id.toString()} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
                </div>
              </Product>
            </li>
            {index !== products.length - 1 && <hr key={`hr_${id}`} className="my-1 mx-2" />}
          </>
        ))}
      </ul>
    </CardWrapper>
  );
}
