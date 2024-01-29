import { NavLink } from "react-router-dom";

type TSidebarItem = {
  title: string;
};

export function SidebarItem({ title }: TSidebarItem): JSX.Element {
  let link = "";
  switch (title) {
    case "Product":
      link = "/";
      break;
    case "Revenue":
      link = "/revenue";
      break;
    case "Categories":
      link = "/categories";
      break;
  }
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive || title === "Product"
          ? `text-primary-orange uppercase`
          : "text-black uppercase"
      }
    >
      {title}
    </NavLink>
  );
}
