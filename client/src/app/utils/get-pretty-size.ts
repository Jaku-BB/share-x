export const getPrettySize = (size: number) => {
  const units = ["B", "KB", "MB"];
  let unitIndex = 0;

  while (size >= 1024) {
    size /= 1024;
    unitIndex++;
  }

  return [Math.round(size), units[unitIndex]] as const;
};
