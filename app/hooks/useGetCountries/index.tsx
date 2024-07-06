import COUNTRY from "~/data/static-data/country";

const useGetCountries = () => {
  const country = COUNTRY.map((item) => ({ value: item.name, label: item.name, code: item.code }));

  const dialCode = COUNTRY.map((item) => ({
    value: item.dial_code,
    label: item.dial_code,
    code: item.code,
    image: item.image,
  }));

  return { country, dialCode };
};

export default useGetCountries;
