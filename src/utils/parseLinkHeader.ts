export const customParseLinkHeader = async (headers: string) => {
  const arrHeaders = headers.split(", ").map((header) => header.split("; "));
  const arrHeaders2 = arrHeaders.map((arrHeader) => {
    const headerKey = arrHeader[1].replace(/"/g, "").replace("rel=", "");
    const headerVal = arrHeader[0].slice(-11, -10);
    return [headerKey, headerVal];
  });
  return Object.fromEntries(arrHeaders2);
};
