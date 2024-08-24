const convertSlug = (name: string) => name.split(" ").join("-").toLocaleLowerCase();

export default convertSlug;
