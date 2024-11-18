const generateSlug = (name: string) => name.split(" ").join("-").toLowerCase();

export default generateSlug;
