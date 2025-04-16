export const isDefined = <T>(value: T): value is Exclude<T, undefined> => {
  return typeof value !== undefined;
};
