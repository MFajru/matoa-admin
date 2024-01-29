type Input = {
  type: string;
  name: string;
  placeholder?: string;
  value: string | number;
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  err?: string;
  variants?: string;
  symbol?: string;
};

export function InputField({
  type,
  placeholder,
  value,
  label,
  onChange,
  name,
  err = "",
  variants = "bgWhite",
  symbol,
}: Input): JSX.Element {
  let style = "";
  switch (variants) {
    case "bgWhite":
      style =
        "text-black px-3 py-2 bg-white rounded-md border border-slate-300 w-full";
      break;
    case "multiForm":
      style =
        "text-black px-3 py-2 bg-secondary rounded-md border border-secondary w-full";
      break;
  }
  return (
    <div className="w-full relative">
      <p className="text-lg">{label}</p>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          className={
            style +
            (err != ""
              ? " border-red-500 focus:outline-red-500"
              : " focus: outline-gray-700")
          }
          onChange={onChange}
        />
        {variants === "multiForm" ? (
          <p className="text-xl absolute right-3 top-[6px]">{symbol}</p>
        ) : null}
      </div>

      <p className={`text-red-600 text-sm absolute left-0 bottom-[-20px]`}>
        {err}
      </p>
    </div>
  );
}
