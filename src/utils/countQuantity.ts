import { TModelProduct } from "@/types/product";

export const countQuantity = (arrModel: TModelProduct[]) => {
  let sum = 0;
  for (const model of arrModel) {
    sum += model.qty;
  }
  return sum;
};
