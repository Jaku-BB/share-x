export const classNameMerge = (...value: (string | false | undefined)[]) => {
  return value.filter(Boolean).join(" ");
};
