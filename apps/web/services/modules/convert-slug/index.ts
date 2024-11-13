const convertSlug = (name: string) => name.split(" ").join("-").toLowerCase();

export default convertSlug;
