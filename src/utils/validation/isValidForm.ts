import { isFieldEmpty } from "./isFieldEmpty";

export const isValidForm = <T>(
  data: Record<string, string | number>,
  setError: React.Dispatch<React.SetStateAction<T>>
): boolean => {
  const ObjData = Object.entries(data);
  let countEmpty = 0;
  for (const [key, value] of ObjData) {
    if (isFieldEmpty(value)) {
      countEmpty += 1;
      setError((prevData) => {
        return {
          ...prevData,
          [key]: true,
        };
      });
    }
  }
  if (countEmpty >= 1) {
    return false;
  }

  return true;
};
