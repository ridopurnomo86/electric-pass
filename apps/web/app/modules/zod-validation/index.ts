import { ZodError, ZodType } from "zod";

type ZObjectType = ZodType<Record<string | number, unknown>>;

type ZodParams<T extends ZObjectType> = {
  onSuccess(data: T["_output"]): void;
  onError(error: Partial<Record<keyof T["_output"], string>>): void;
  data: Record<string, unknown>;
  schema: T;
};

export type ValidationError<T extends ZObjectType> = Partial<Record<keyof T["_output"], string>>;

//  @argument ErrorType : if you need to assert your error type, just pass it as a generics via asserting with the as keyword
export const handleOneLevelZodError = ({ issues }: ZodError<unknown>) => {
  const formData: Record<string, string> = {};

  // - line of code should be true if the schema is not an object
  // - This line is completely optional
  if (issues.length === 1 && issues[0].path.length < 1) return issues[0].message;

  issues.forEach(({ path, message }) => {
    formData[path.join("-")] = message;
  });

  return formData;
};

export const handleZodValidation = <T extends ZObjectType>(params: ZodParams<T>) => {
  const { data, onError, onSuccess, schema } = params;

  try {
    const res = schema.parse(data);
    onSuccess(res);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErr = handleOneLevelZodError(error);
      onError(formattedErr as Record<keyof T["_output"], string>);
    } else {
      throw new Error(String(error));
    }
  }
};
