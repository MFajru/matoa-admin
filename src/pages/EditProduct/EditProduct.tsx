import { Step1 } from "@/components/Form/MultiForm/Step1";
import { Step2 } from "@/components/Form/MultiForm/Step2";
import { Step3 } from "@/components/Form/MultiForm/Step3";
import { customFetch } from "@/lib/customFetch";
import { fetchDetailProduct } from "@/stores/slices/products/detailProductSlice";
import { AppDispatch, RootState } from "@/stores/stores";
import { TProduct } from "@/types/product";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const detailProduct = useSelector((state: RootState) => {
    return {
      response: state.detailProduct.response,
      status: state.detailProduct.status,
    };
  });
  const dispatch = useDispatch<AppDispatch>();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<TProduct>({} as TProduct);

  const fetchUpdateData = async (id: string) => {
    try {
      const response = await customFetch(`products/${id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Something bad happened, ${result.message}`);
      }
      toast.success("Product successfully Updated");

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
    if (id) {
      await fetchUpdateData(id);
    }
    console.log(detailProduct.response);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (detailProduct.status === "success") {
      setFormData(detailProduct.response);
    }
    console.log(formData);
  }, [detailProduct.status, detailProduct.response]);

  return (
    <div className="py-14">
      <Toaster richColors position="top-center" />
      <h1 className="uppercase font-semibold text-2xl">Edit Product{step}/3</h1>
      {detailProduct.status === "loading" && <div>Loading...</div>}
      {detailProduct.status === "failed" && (
        <div>Failed to load. Please refresh the page...</div>
      )}
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
