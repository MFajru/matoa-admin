import { customFetch } from "@/lib/customFetch";
import { TProduct } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IProductState {
  response: TProduct;
  status: "idle" | "success" | "loading" | "failed";
}

const initialState: IProductState = {
  response: {} as TProduct,
  status: "idle",
};

export const fetchDetailProduct = createAsyncThunk(
  "products/detailProduct",
  async (id: string) => {
    try {
      const response = await customFetch(`products/${id}`, {
        method: "get",
      });

      if (!response.ok) {
        throw new Error("Something bad happened");
      }
      const result = await response.json();
      return result as TProduct;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const productsSlice = createSlice({
  name: "detailProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.response = action.payload;
      })
      .addCase(fetchDetailProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetailProduct.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
