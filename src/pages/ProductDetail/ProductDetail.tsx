import { Button } from "@/components/Button/Button";
import { fetchDetailProduct } from "@/stores/slices/products/detailProductSlice";
import { AppDispatch, RootState } from "@/stores/stores";
import { countQuantity } from "@/utils/countQuantity";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

export const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [mainPhoto, setMainPhoto] = useState<string>();
  const [photoIsActive, setPhotoIsActive] = useState<number>(0);
  const product = useSelector((state: RootState) => {
    return {
      response: state.detailProduct.response,
      status: state.detailProduct.status,
    };
  });

  useEffect(() => {
    dispatch(fetchDetailProduct(id!));
  }, [dispatch, id]);

  return (
    <>
      {product.status === "loading" && <div>Loading...</div>}
      {product.status === "success" && (
        <div className="pt-12 flex flex-col gap-20">
          <div className="w-full flex justify-end">
            <Link to={"/"}>
              <Button variants="secondary">back</Button>
            </Link>
          </div>
          <div className="flex">
            <div className="flex flex-col gap-2">
              {product.response.model[0].photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  className={
                    idx === photoIsActive ? "opacity-100" : "opacity-50"
                  }
                  width={70}
                  alt={product.response.name}
                  onClick={() => {
                    setPhotoIsActive(idx);
                    setMainPhoto(photo);
                  }}
                />
              ))}
            </div>
            <img
              src={mainPhoto ? mainPhoto : product.response.model[0].photos[0]}
              width={300}
              alt="Way Kambas Mini Ebony Watch"
              className="ml-5"
            />
            <div className="flex flex-col ml-5 gap-2">
              <h1 className="uppercase text-6xl w-[450px]">
                {product.response.name}
              </h1>
              <p className="text-gray-500 text-xl mt-2">
                disc {product.response.discount}%
              </p>
              <p className=" text-2xl">
                {formatToRupiah(product.response.price)}
              </p>
              <p className=" text-xl text-gray-500">
                quantity {countQuantity(product.response.model)}{" "}
                <span className="text-primary-orange">pcs</span>
              </p>
            </div>
          </div>
          <div className="mb-28">
            <h2 className="text-xl text-primary-orange">Detail</h2>
            <div className="flex flex-col gap-4 mt-7">
              <h3 className="text-xl">Material</h3>
              <p>{product.response.material}</p>
            </div>
            <div className="flex flex-col gap-4 mt-7">
              <h3 className="text-xl">Case</h3>
              <p>{product.response.caseDetail}</p>
            </div>
            <div className="flex flex-col gap-4 mt-7">
              <h3 className="text-xl">Movement</h3>
              <p>{product.response.movement}</p>
            </div>
            <div className="flex flex-col gap-4 mt-7">
              <h3 className="text-xl">Dial</h3>
              <p>{product.response.dial}</p>
            </div>
            <div className="flex flex-col gap-4 mt-7">
              <h3 className="text-xl">Hand</h3>
              <p>{product.response.hand}</p>
            </div>
            <div className="flex flex-col gap-4 mt-7">
              <h3 className="text-xl">Important Note</h3>
              <p>{product.response.importantNote}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
