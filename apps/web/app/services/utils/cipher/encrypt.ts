import bcrypt from "bcryptjs";

export const encrypt = async ({
  value,
}: {
  value: string;
}): Promise<{ salt: string; hash: string }> => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(value, salt);

  return { hash, salt };
};

export const decrypt = async ({ value, hash }: { value: string; hash: string }) => {
  const match = await bcrypt.compare(value, hash);

  return match;
};
