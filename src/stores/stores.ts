import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "@/stores/slices/products/productsSlice";
import detailProductSlice from "@/stores/slices/products/detailProductSlice";
import themeSlice from "@/stores/slices/theme/themeSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    detailProduct: detailProductSlice,
    theme: themeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
