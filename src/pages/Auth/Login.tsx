import { Button } from "@/components/Button/Button";
import { InputField } from "@/components/Form/InputField";
import { customFetch } from "@/lib/customFetch";
import { IFormData } from "@/types/form";
import { isValidEmail } from "@/utils/validation/isValidEmail";
import { isValidForm } from "@/utils/validation/isValidForm";
import Cookies from "js-cookie";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

type TLoginFormError = {
  email: boolean;
  password: boolean;
};

export const Login = () => {
  const [loginValue, setLoginValue] = useState<IFormData>({
    email: "",
    password: "",
  });
  const [isFormError, setIsFormError] = useState<TLoginFormError>({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const fetchLogin = async () => {
    try {
      const response = await customFetch("users", {
        method: "get",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Something bad happened, ${result.message}`);
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormError((prevData) => {
      return {
        ...prevData,
        [e.target.name]: false,
      };
    });
    setLoginValue((existingData) => {
      return { ...existingData, [e.target.name]: e.target.value };
    });
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      isValidForm(loginValue, setIsFormError) &&
      isValidEmail(loginValue.email)
    ) {
      const result = await fetchLogin();
      for (const res of result) {
        if (res.email === loginValue.email) {
          const token = crypto.randomUUID();
          Cookies.set("token", token);
          toast.success("Login successful");
          setTimeout(() => {
            navigate("/auth/signup");
          }, 1500);
          return;
        }
      }
      toast.error("Account not found, wrong email or password");
    }
  };
  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="flex flex-col mt-32 items-center w-full">
        <h1 className="text-[40px]">Log In</h1>
        <form
          className="flex flex-col w-full gap-5"
          onSubmit={handleOnSubmit}
          noValidate
        >
          <InputField
            type="email"
            label="Email"
            placeholder="Your email here..."
            value={loginValue.email}
            onChange={handleOnChange}
            name="email"
            err={
              isFormError.email
                ? "Email must be filled"
                : !isValidEmail(loginValue.email) && loginValue.email
                ? "Invalid email format, ex: john@mail.com"
                : ""
            }
          />
          <InputField
            type="password"
            label="Password"
            placeholder="Your password here..."
            value={loginValue.password}
            onChange={handleOnChange}
            name="password"
            err={isFormError.password ? "Password must be filled" : ""}
          />
          <div className="flex justify-between">
            <div className="flex gap-2">
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <label htmlFor="rememberMe" className="text-sm text-gray-500">
                Remember Me
              </label>
            </div>
            <p className="text-sm text-gray-500">Forgot password?</p>
          </div>

          <div className="mt-3">
            <Button type="submit" size="big">
              Log In
            </Button>
          </div>
          <p>
            Don't have an account?{" "}
            <Link
              to={"/auth/signup"}
              className="cursor-pointer text-custom-purple font-semibold"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
