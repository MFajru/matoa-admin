export type TModelProduct = {
  name: string;
  qty: number;
  photos: string[];
};

export type TProduct = {
  id?: number;
  name: string;
  price: number;
  weight: number;
  width: number;
  length: number;
  category: string;
  discount: number;
  caseDetail: string;
  dial: string;
  hand: string;
  material: string;
  importantNote: string;
  movement: string;
  model: TModelProduct[];
};
