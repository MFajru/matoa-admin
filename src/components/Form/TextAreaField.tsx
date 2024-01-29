interface ITextArea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  err?: string;
}

export const TextAreaField = ({ label, err = "", ...props }: ITextArea) => {
  return (
    <div className="w-full relative">
      <p className="text-lg">{label}</p>
      <textarea
        className="text-black px-3 py-2 bg-secondary rounded-md border border-secondary w-full outline-gray-700"
        rows={5}
        {...props}
      />
      <p className={`text-red-600 text-sm absolute left-0 bottom-[-20px]`}>
        {err}
      </p>
    </div>
  );
};
