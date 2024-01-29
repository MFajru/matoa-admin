export const isFieldEmpty = (value: string | number): boolean => {
  if (value === "") {
    return true;
  }
  return false;
};
