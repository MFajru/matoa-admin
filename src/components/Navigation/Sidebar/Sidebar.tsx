import { Button } from "@/components/Button/Button";
import { SidebarItem } from "./SidebarItem";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDarkMode } from "@/stores/slices/theme/themeSlice";

export function Sidebar(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnLogout = () => {
    Cookies.remove("token");
    navigate("/auth/login", {
      replace: true,
    });
  };
  return (
    <>
      <div className="w-[21%] bg-primary-orange-bright min-h- fixed left-0 px-7 py-20 z-10 rounded-[10px] flex flex-col gap-20 items-start">
        <div className="border-b border-primary-orange w-full">
          <p className="text-[32px] text-black text-center">Matoa Admin</p>
        </div>
        <div className="flex flex-col gap-7 h-full w-full text-center">
          <SidebarItem title="Product" />
          <SidebarItem title="Revenue" />
          <SidebarItem title="Categories" />
        </div>
        <div className="flex flex-col w-full text-center gap-4 mt-52">
          <div>
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
          <Button variants="logout" onClick={handleOnLogout}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
