const generateSlug = (name: string) => name.split(" ").join("-").toLocaleLowerCase();

export default generateSlug;
