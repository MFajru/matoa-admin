import { ButtonHTMLAttributes, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { customFetch } from "@/lib/customFetch";
import { Button } from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores/stores";
import {
  TFetchProducts,
  fetchProducts,
} from "@/stores/slices/products/productsSlice";

interface TButtonWithModal extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  name: string;
  fetchParams: TFetchProducts;
}

export const ButtonWithModal = ({
  children,
  name,
  id,
  fetchParams,
  ...props
}: TButtonWithModal): JSX.Element => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleOnClose = () => {
    setIsShow(!isShow);
  };

  const requestDeleteData = async () => {
    try {
      const response = await customFetch(`products/${id}`, {
        method: "delete",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Something bad happened, ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleDeleteData = async () => {
    await requestDeleteData();
    dispatch(fetchProducts(fetchParams));
  };

  return (
    <>
      <button {...props} onClick={handleOnClose}>
        {children}
      </button>
      {!isShow ? null : (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-10">
          <div
            className={`rounded-lg bg-white flex flex-col py-5 z-20 ${
              darkMode ? "dark" : ""
            }`}
          >
            <div className="flex justify-between border-b border-slate-300">
              <p className="text-primary-orange text-xl mx-5">Confirm Delete</p>
              <Button variants="modalClose" onClick={() => setIsShow(!isShow)}>
                <XMarkIcon
                  width={25}
                  height={25}
                  className="text-primary-orange"
                />
              </Button>
            </div>
            <div className="text-xl mx-10 h-[100px] flex items-center">
              <p>
                {" "}
                Are you sure want to delete{" "}
                <span className="text-primary-orange">{name}</span> ?
              </p>
            </div>
            <div className="flex gap-3 px-3 pt-4 justify-end border-t border-slate-300">
              <Button variants="primary" onClick={handleDeleteData}>
                Yes
              </Button>
              <Button onClick={() => setIsShow(!isShow)} variants="secondary">
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
