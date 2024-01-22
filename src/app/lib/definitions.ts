interface _framework {
  children?: React.ReactNode;
}

export interface iCardWrapper extends _framework {
  title: string;
  action?: React.ReactNode;
}

export interface iProduct extends _framework {
  id?: string;
  title: string;
  // stock: number;
  description: string;
}
