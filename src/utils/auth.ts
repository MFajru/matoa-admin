import Cookies from "js-cookie";

export const isAuthenticated = (): boolean => {
  const userToken = Cookies.get("token");
  return userToken !== undefined;
};
