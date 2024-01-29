import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/stores";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useNavigate } from "react-router-dom";
import { ButtonWithModal } from "@/components/Modal/ButtonWithModal";
import { Dispatch, SetStateAction } from "react";
import { TFetchProducts } from "@/stores/slices/products/productsSlice";

type TTable = {
  fetchParams: TFetchProducts;
  setFetchParams: Dispatch<SetStateAction<TFetchProducts>>;
  limit: number;
  page: number;
};

export const Table = ({
  fetchParams,
  setFetchParams,
  limit,
  page,
}: TTable): JSX.Element => {
  const products = useSelector((state: RootState) => {
    return {
      response: state.products.response,
      status: state.products.status,
    };
  });
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (fetchParams.sort === "id") {
      setFetchParams({
        sort: "name",
        order: "asc",
        filter: fetchParams.filter,
      });
    } else if (fetchParams.sort === "name" && fetchParams.order === "asc") {
      setFetchParams({
        sort: "name",
        order: "desc",
        filter: fetchParams.filter,
      });
    } else if (fetchParams.sort === "name" && fetchParams.order === "desc") {
      setFetchParams({
        sort: "name",
        order: "asc",
        filter: fetchParams.filter,
      });
    }
  };

  return (
    <>
      <table className="w-full border-collapse border border-gray-200 bg-white">
        <thead>
          <tr>
            <th className="text-left py-4 px-3 text-black hover:bg-primary-orange-bright">
              ID
            </th>
            <th className="text-left px-3 text-black hover:bg-primary-orange-bright h-[50px]">
              <Button variants="plain" size="full" onClick={handleOnClick}>
                <div className="flex justify-between items-center w-full">
                  Name
                  {fetchParams.sort === "name" &&
                    fetchParams.order === "asc" && (
                      <ChevronDownIcon width={15} height={15} />
                    )}
                  {fetchParams.sort === "name" &&
                    fetchParams.order === "desc" && (
                      <ChevronUpIcon width={15} height={15} />
                    )}
                </div>
              </Button>
            </th>
            <th className="text-left py-4 border px-3 text-black hover:bg-primary-orange-bright">
              Category
            </th>
            <th className="text-left py-4 border px-3 text-black hover:bg-primary-orange-bright">
              Prices
            </th>
            <th className="text-left py-4 border px-3 text-black hover:bg-primary-orange-bright">
              Discount
            </th>
            <th className="text-left py-4 border px-3 text-black hover:bg-primary-orange-bright"></th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {products.response
            .slice(limit * page, limit * (page + 1))
            .map((product, idx) => (
              <tr
                key={idx}
                className="hover:bg-primary-orange-bright text-black"
              >
                <td className="border-t border-gray-200 align-middle py-4 px-3">
                  {product.id}
                </td>
                <td className=" border-t border-gray-200 align-middle py-4 px-3">
                  {product.name}
                </td>
                <td className="text-right border border-gray-200 py-4 px-3">
                  {product.category === "1" && "Digital Watches"}
                  {product.category === "2" && "Classic Watches"}
                  {product.category === "3" && "Smart Watches"}
                </td>
                <td className="text-right border border-gray-200 py-4 px-3">
                  {formatToRupiah(product.price)}
                </td>
                <td className="text-right border border-gray-200 py-4 px-3">
                  {product.discount}%
                </td>
                <td className="border border-gray-200 py-4 px-3">
                  <div className="flex justify-between">
                    <Button
                      variants="plain"
                      onClick={() => {
                        navigate(`/product/${product.id}/edit`);
                      }}
                    >
                      <PencilIcon
                        className="text-primary-orange"
                        width={24}
                        height={24}
                      />
                    </Button>
                    <ButtonWithModal
                      name={product.name}
                      id={product.id!.toString()}
                      fetchParams={fetchParams}
                    >
                      <TrashIcon
                        className="text-primary-orange"
                        width={24}
                        height={24}
                      />
                    </ButtonWithModal>
                    <Button
                      variants="plain"
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      <EllipsisVerticalIcon width={24} height={24} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
