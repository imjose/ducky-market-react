"use client";

import React, { useState } from "react";
import clsx from "clsx";

import CardWrapper from "@/app/ui/card-wrapper";
import Product from "@/app/ui/product";
import ProductStepper from "@/app/ui/product-stepper";

import { iProduct } from "@/app/lib/definitions";

export default function Products({
  products,
  submitTransaction,
}: {
  products: iProduct[];
  submitTransaction: (selectedProducts: { [key: string]: number }) => void;
}) {
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: number }>({});

  const addTransaction = (
    <button
      type="button"
      onClick={() => {
        submitTransaction(selectedProducts);
        setSelectedProducts({});
      }}
      className={clsx(
        "flex items-center justify-center rounded-md h-8 py-1 px-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white",
        { "hidden": !Object.keys(selectedProducts).length }
      )}
    >
      <span>Add Transaction</span>
    </button>
  );

  const selectProduct = (id: string) => {
    if (selectedProducts[id]) return;

    setSelectedProducts(prev => ({ ...prev, [id]: 1 }));
  };

  return (
    <CardWrapper title="Products" action={addTransaction}>
      <ul className="overflow-auto max-h-[560px]">
        {products.map(({ id, title, description }, index) => (
          <>
            <li
              key={id}
              onClick={() => selectProduct(id)}
              className={clsx(
                "cursor-pointer rounded-lg ",
                { "hover:bg-slate-100": !Object.hasOwn(selectedProducts, id) },
                { "text-white bg-blue-600 hover:bg-blue-500 cursor-default": Object.hasOwn(selectedProducts, id) }
              )}
            >
              <Product title={title} description={description}>
                <div className={clsx({ "hidden": !Object.hasOwn(selectedProducts, id) })}>
                  <ProductStepper id={id} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
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
