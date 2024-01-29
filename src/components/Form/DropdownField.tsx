import { useEffect } from "react";

type TDropdown = {
  id: string;
  name: string;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  err?: string;
  options: string[];
};

export const DropdownField = ({
  id,
  label,
  onChange,
  name,
  err = "",
  defaultValue,
  options,
}: TDropdown) => {
  useEffect(() => {
    console.log(defaultValue);
  });
  return (
    <div className="w-full">
      <p className="text-lg">{label}</p>
      <div>
        <select
          name={name}
          id={id}
          onChange={onChange}
          className="w-full rounded-md px-2 py-2 text-black outline-gray-700"
          value={defaultValue}
        >
          <option value="" disabled>
            Choose Category
          </option>
          {options.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
      </div>

      <p className={`text-red-600 text-sm absolute left-0 bottom-[-20px]`}>
        {err}
      </p>
    </div>
  );
};
