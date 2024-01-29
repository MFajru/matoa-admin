import { Button } from "@/components/Button/Button";
import { InputField } from "@/components/Form/InputField";
import { Table } from "@/components/Table/Table";
import {
  TFetchProducts,
  fetchProducts,
} from "@/stores/slices/products/productsSlice";
import { AppDispatch, RootState } from "@/stores/stores";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const limit = 9;
  const [paginationButtons, setPaginationButtons] = useState<number[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [paginationPage, setPaginationPage] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(0);
  const [fetchParams, setFetchParams] = useState<TFetchProducts>({
    sort: "id",
    order: "asc",
    filter: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => {
    return {
      response: state.products.response,
      status: state.products.status,
    };
  });
  const navigate = useNavigate();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFetchParams((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
    if (e.target.value != "") {
      setActivePage(0);
      setPaginationPage(0);
    }
  };

  const handlePrevPage = () => {
    setActivePage(paginationPage - 1);
    setPaginationPage(paginationPage - 1);
  };

  const handleNextPage = () => {
    setPaginationPage(paginationPage + 1);
  };

  const handleOnClickFirstPage = () => {
    setPaginationPage(0);
    setActivePage(0);
  };

  const handleOnClickLastPage = () => {
    const lastPage = Math.floor(products.response.length / limit);
    setPaginationPage(lastPage);
    setActivePage(lastPage);
  };

  const handleOnClickNumberPage = (numPage: number) => {
    setActivePage(numPage);
    setPaginationPage(numPage);
  };

  useEffect(() => {
    const tPage = Math.ceil(products.response.length / limit);
    setTotalPage(tPage);
  }, [products.response.length]);

  useEffect(() => {
    dispatch(fetchProducts(fetchParams));
  }, [dispatch, fetchParams]);

  useEffect(() => {
    const tempArr: number[] = [];
    for (let i = 0; i < totalPage; i++) {
      tempArr.push(i);
  }
    setPaginationButtons(tempArr);
  }, [totalPage]);
  return (
    <div className=" flex flex-col relative pt-5">
      <h1 className="uppercase font-semibold text-2xl mt-8">Product List</h1>
      <div className="mt-6">
        <div className="flex fixed right-[56px] w-[450px] top-[60px] gap-2">
          <Button
            variants="primary"
            size="medium"
            onClick={() => {
              navigate("/product/add");
            }}
          >
            Add Product
          </Button>
          <InputField
            type="text"
            name="filter"
            placeholder="Search by name"
            value={fetchParams.filter!}
            onChange={handleSearchInputChange}
            err=""
          />
        </div>
        {products.status === "loading" && fetchParams.order === "id" && (
          <div>Loading...</div>
        )}
        {products.status === "success" && (
          <>
            <Table
              fetchParams={fetchParams}
              setFetchParams={setFetchParams}
              limit={limit}
              page={paginationPage}
            />
            <div className="flex justify-end mt-4">
              <div className="flex gap-1">
                <Button
                  variants="paginationIcons"
                  onClick={handleOnClickFirstPage}
                >{`<<`}</Button>
                <Button
                  variants="paginationIcons"
                  onClick={handlePrevPage}
                >{`<`}</Button>
                {paginationButtons.map((paginationButton, idx) => (
                  <Button
                    key={idx}
                    variants={
                      paginationButton === activePage
                        ? "activePaginationIcons"
                        : "paginationIcons"
                    }
                    onClick={() => {
                      handleOnClickNumberPage(paginationButton);
                    }}
                  >
                    {paginationButton + 1}
                  </Button>
                ))}
                <Button
                  variants="paginationIcons"
                  onClick={handleNextPage}
                >{`>`}</Button>
                <Button
                  variants="paginationIcons"
                  onClick={handleOnClickLastPage}
                >{`>>`}</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
