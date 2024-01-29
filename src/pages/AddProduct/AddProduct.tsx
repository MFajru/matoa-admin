import { Step1 } from "@/components/Form/MultiForm/Step1";
import { Step2 } from "@/components/Form/MultiForm/Step2";
import { Step3 } from "@/components/Form/MultiForm/Step3";
import { customFetch } from "@/lib/customFetch";
import { TModelProduct, TProduct } from "@/types/product";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export const AddProduct = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<TProduct>({
    name: "",
    price: 0,
    weight: 0,
    width: 0,
    length: 0,
    category: "",
    discount: 0,
    caseDetail: "",
    dial: "",
    hand: "",
    material: "",
    importantNote: "",
    movement: "",
    model: [
      {
        name: "",
        qty: 0,
        photos: [],
      } as TModelProduct,
    ],
  });

  const fetchPostData = async () => {
    try {
      const response = await customFetch("products", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Something bad happened, ${result.message}`);
      }
      toast.success("Product successfully added");

      setTimeout(() => {
        navigate("/");
      }, 1500);

      return result;
    } catch (error) {
      toast.error("Product failed to add, server error");
      console.error(error);
      throw error;
    }
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchPostData();
    setFormData({
      name: "",
      price: 0,
      weight: 0,
      width: 0,
      length: 0,
      category: "",
      discount: 0,
      caseDetail: "",
      dial: "",
      hand: "",
      material: "",
      importantNote: "",
      movement: "",
      model: [
        {
          name: "",
          qty: 0,
          photos: [],
        } as TModelProduct,
      ],
    });
  };

  return (
    <div className="py-14">
      <Toaster richColors position="top-center" />
      <h1 className="uppercase font-semibold text-2xl">
        Add New Product {step}/3
      </h1>
      {step === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
          step={step}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
          step={step}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
          step={step}
          handleOnSubmit={handleOnSubmit}
        />
      )}
    </div>
  );
};
