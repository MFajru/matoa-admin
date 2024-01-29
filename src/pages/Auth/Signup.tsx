import { Button } from "@/components/Button/Button";
import { InputField } from "@/components/Form/InputField";
import { customFetch } from "@/lib/customFetch";
import { IFormData } from "@/types/form";
import { isValidEmail } from "@/utils/validation/isValidEmail";
import { isValidForm } from "@/utils/validation/isValidForm";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

type formSignUpError = {
  fname: boolean;
  email: boolean;
  password: boolean;
  confirmPass: boolean;
};

export const SignUp = () => {
  const [registerValue, setRegisterValue] = useState<IFormData>({
    fname: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [isError, setIsError] = useState<formSignUpError>({
    fname: false,
    email: false,
    password: false,
    confirmPass: false,
  });
  const navigate = useNavigate();
  const correctPassword: boolean =
    registerValue.password === registerValue.confirmPass;

  const fetchSignup = async () => {
    try {
      const response = await customFetch("users", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: registerValue.email,
          password: registerValue.password,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Something bad happened, ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError((prevData) => {
      return { ...prevData, [e.target.name]: false };
    });

    setRegisterValue((existingVal) => {
      return { ...existingVal, [e.target.name]: e.target.value };
    });
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      isValidForm(registerValue, setIsError) &&
      correctPassword &&
      isValidEmail(registerValue.email)
    ) {
      await fetchSignup();
      toast.success("Register success!");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    }
  };
  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="flex flex-col mt-20 lg:mt-28 items-center w-full">
        <h1 className="text-[40px] text-left w-full lg:text-center">Sign Up</h1>
        <form
          className="flex flex-col w-full gap-6 mt-7"
          onSubmit={handleOnSubmit}
          noValidate
        >
          <InputField
            type="text"
            label="Full Name"
            placeholder="Your full name here..."
            value={registerValue.fname!}
            onChange={handleOnChange}
            name="fname"
            err={isError.fname ? "Full Name must be filled" : ""}
          />
          <InputField
            type="email"
            label="Email"
            placeholder="Your email here..."
            value={registerValue.email}
            onChange={handleOnChange}
            name="email"
            err={
              isError.email
                ? "Email must be filled"
                : !isValidEmail(registerValue.email) && registerValue.email
                ? "Invalid email format, ex: john@mail.com"
                : ""
            }
          />
          <InputField
            type="password"
            label="Password"
            placeholder="Your password here..."
            value={registerValue.password}
            onChange={handleOnChange}
            name="password"
            err={isError.password ? "Password must be filled" : ""}
          />
          <InputField
            type="password"
            label="Confirm Password"
            placeholder="Your confirm password here..."
            value={registerValue.confirmPass!}
            onChange={handleOnChange}
            name="confirmPass"
            err={`${
              isError.confirmPass
                ? "Confirm password must be filled"
                : !correctPassword && registerValue.confirmPass !== ""
                ? "Password not match"
                : ""
            }`}
          />
          <div className="mt-3">
            <Button type="submit" size="big">
              Sign Up
            </Button>
          </div>
          <p>
            Have an account?{" "}
            <Link
              to={"/auth/login"}
              className="cursor-pointer text-custom-purple font-semibold"
            >
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
