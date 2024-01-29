import { Outlet } from "react-router-dom";
import { Button } from "../Button/Button";
import { useDispatch } from "react-redux";
import { setDarkMode } from "@/stores/slices/theme/themeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/stores";

export const AuthLayout = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  return (
    <div className={`flex ${darkMode ? "dark" : ""}`}>
      <div className="hidden lg:w-1/2 lg:h-screen lg:block">
        <img
          src="/src/assets/pictures/auth.png"
          alt="Picture of hand using watch"
          className="h-full object-cover"
        />
      </div>
      <div className="flex flex-col px-8 py-10 w-full lg:w-1/2">
        <img
          src="/src/assets/logos/matoa.png"
          alt="Matoa Logo"
          className="fixed right-10 w-28 lg:w-36"
        />
        <Outlet />
        <div className="fixed bottom-10 right-10">
          <Button
            variants="borderedIcons"
            onClick={() => {
              dispatch(setDarkMode());
            }}
          >
            <img
              src="/src/assets/icons/theme-light-dark.svg"
              alt="Theme Icon"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
