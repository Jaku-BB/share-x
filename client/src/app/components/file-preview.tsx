import { getPrettySize } from "~/app/utils/get-pretty-size";

interface FilePreviewProps {
  file: File;
}

export const FilePreview = ({ file }: FilePreviewProps) => {
  const fileName = file.name;
  const [size, unit] = getPrettySize(file.size);

  return (
    <div className="flex items-center text-[15px] text-neutral-900 bg-indigo-50 rounded-xl py-1.5 px-3 justify-between gap-8">
      <span className="truncate" title={fileName}>
        {fileName}
      </span>
      <span className="shrink-0">
        {size} <abbr>{unit}</abbr>
      </span>
    </div>
  );
};
