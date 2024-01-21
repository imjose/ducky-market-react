import React from "react";

type ProductStepperProps = {
  id: string;
  selectedProducts: { [key: string]: number };
  setSelectedProducts: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
};

function ProductStepper({ id, selectedProducts, setSelectedProducts }: ProductStepperProps) {
  function onDecrement() {
    return setSelectedProducts(({ [id]: prop, ...prev }) => ({ ...prev, ...(prop - 1 > 0 ? { [id]: prop - 1 } : {}) }));
  }

  function onIncrement() {
    return setSelectedProducts(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  return (
    <div className="flex flex-col justify-center items-center h-full px-4">
      <span className="text-md">Quantity</span>
      <div className="flex flex-row justify-between items-center w-14">
        <button className="font-bold" onClick={onDecrement}>
          -
        </button>
        <span>{selectedProducts[id]}</span>
        <button className="font-bold" onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  );
}

export default ProductStepper;
