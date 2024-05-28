"use client";

import { Button } from "~/app/components/button";
import { classNameMerge } from "~/app/utils/class-name-merge";
import { ArrowUpFromLine } from "lucide-react";
import { useState } from "react";

export const FileForm = () => {
  const [isFileOverInput, setIsFileOverInput] = useState(false);

  return (
    <form className="max-w-xs w-full flex flex-col gap-4">
      <label
        className={classNameMerge(
          "flex flex-col gap-3 relative border-dashed group has-[:focus]:border-indigo-400 has-[:focus]:bg-indigo-50 hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-center py-4 px-8 border border-neutral-400 items-center rounded-xl",
          isFileOverInput && "border-indigo-400 bg-indigo-50",
        )}
        onDragEnter={() => setIsFileOverInput(true)}
        onDragLeave={() => setIsFileOverInput(false)}
      >
        <ArrowUpFromLine
          className={classNameMerge(
            "transition-colors group-has-[:focus]:text-indigo-400 group-hover:text-indigo-400",
            isFileOverInput ? "text-indigo-400" : "text-neutral-900",
          )}
        />
        <span className="text-neutral-900 font-medium text-[15px]">
          Drop your file or click here
        </span>
        <span className="text-xs text-neutral-500">
          Up to 500 <abbr>MB</abbr>
        </span>
        <input
          type="file"
          className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
        />
      </label>
      <Button>Share your file</Button>
    </form>
  );
};
