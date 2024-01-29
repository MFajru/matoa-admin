import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  variants?:
    | "primary"
    | "primaryNoRound"
    | "secondary"
    | "modalClose"
    | "logout"
    | "borderedIcons"
    | "paginationIcons"
    | "activePaginationIcons"
    | "trashIconModel"
    | "plain";
  size?: "big" | "medium" | "small" | "full" | "fit";
}

export function Button({
  children,
  type = "button",
  variants = "primary",
  size,
  ...props
}: IButton): JSX.Element {
  let style;
  switch (variants) {
    case "primary":
      style = "bg-primary-orange rounded-md text-white py-2 px-5";
      break;
    case "secondary":
      style =
        "rounded-md px-5 py-1.5 border border-b border-primary-orange text-center text-primary-orange";
      break;
    case "primaryNoRound":
      style = "bg-primary-orange text-white py-2 px-10";
      break;
    case "modalClose":
      style = "w-fit text-primary-orange mr-5";
      break;
    case "logout":
      style =
        "px-3 py-4 border border-b border-primary-orange w-full text-center uppercase text-primary-orange text-2xl";
      break;
    case "paginationIcons":
      style =
        "p-3 rounded-lg bg-white text-xs font-semibold hover:bg-primary-orange-bright";
      break;
    case "activePaginationIcons":
      style =
        "p-3 rounded-lg bg-primary-orange text-xs font-semibold text-white hover:bg-primary-orange-bright";
      break;
    case "borderedIcons":
      style = "p-2 border border-black border-solid rounded-lg bg-white";
      break;
    case "trashIconModel":
      style = "bg-primary-orange h-fit text-white p-2";
      break;
    case "plain":
      style = "rounded-md w-fit text-left";
      break;
    default:
      break;
  }
  switch (size) {
    case "big":
      style += " w-full";
      break;
    case "full":
      style += " w-full h-full";
      break;
    case "medium":
      style += " w-[40%]";
      break;
    case "fit":
      style += " w-fit";
      break;
  }
  return (
    <button {...props} type={type} className={style}>
      {children}
    </button>
  );
}
