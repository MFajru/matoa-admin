import { TProduct } from "@/types/product";
import { FormEvent } from "react";

export type IFormData = {
  email: string;
  fname?: string;
  password: string;
  confirmPass?: string;
};

export type TMultiForm = {
  formData: TProduct;
  setFormData: React.Dispatch<React.SetStateAction<TProduct>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
  handleOnSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};
