import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface IDarkMode {
  darkMode: boolean;
}

let dark = false;
const getCookiesTheme = Cookies.get("theme");
if (getCookiesTheme === "false") {
  dark = false;
} else if (getCookiesTheme === "true") {
  dark = true;
}

const initialState: IDarkMode = {
  darkMode: dark,
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      Cookies.set("theme", state.darkMode.toString());
    },
  },
});

export const { setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
