import { Outlet } from "react-router-dom";
import { Sidebar } from "../Navigation/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/stores";

export const MainLayout = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  return (
    <>
      <Sidebar />
      <div
        className={`container w-[79%] relative left-[21%] px-14 bg-[#F7F6F4] min-h- ${
          darkMode ? "dark" : ""
        }`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
