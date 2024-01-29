import { customFetch } from "@/lib/customFetch";
import { TProduct } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IProductState {
  response: TProduct[];
  status: "idle" | "success" | "loading" | "failed";
}

export type TFetchProducts = {
  sort: string;
  order: string;
  filter: string;
  page?: number;
  limit?: number;
};

const initialState: IProductState = {
  response: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/allProducts",
  async ({ sort, order, filter }: TFetchProducts) => {
    try {
      const response = await customFetch(
        `products?_sort=${sort}&_order=${order}&name_like=${filter}`,
        {
          method: "get",
        }
      );

      if (!response.ok) {
        throw new Error("Something bad happened");
      }
      const result = await response.json();
      return result as TProduct[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.response = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
