interface _framework {
  children?: React.ReactNode;
}

export interface iCardWrapper extends _framework {
  title: string;
  action?: React.ReactNode;
}

export interface iProduct extends _framework {
  id: number;
  title: string;
  // stock: number;
  price: number;
  description: string;
  category?: string;
}
