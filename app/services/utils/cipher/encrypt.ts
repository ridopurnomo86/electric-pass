import bcrypt from "bcryptjs";

export const encrypt = async ({ value }: { value: string }): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hash = bcrypt.hash(value, salt);

  return hash;
};

export const decrypt = async ({ value, hash }: { value: string; hash: string }) => {
  const match = await bcrypt.compare(value, hash);

  return match;
};
