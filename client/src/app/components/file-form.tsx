"use client";

import { Button } from "~/app/components/button";
import { classNameMerge } from "~/app/utils/class-name-merge";
import { getPrettySize } from "~/app/utils/get-pretty-size";
import { ArrowUpFromLine } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  file: FileList;
}

export const FileForm = () => {
  const [isFileOverInput, setIsFileOverInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, formState, watch } = useForm<FormData>();

  const fileInputValue = watch("file");
  const fileInputError = formState.errors.file;

  const onFormSubmission: SubmitHandler<FormData> = (data) => {
    console.log(data);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <form
      className="max-w-xs w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onFormSubmission)}
    >
      <div className="flex flex-col gap-4">
        <label
          className={classNameMerge(
            'flex flex-col gap-3 cursor-pointer has-[[aria-invalid="true"]]:bg-rose-50 has-[[aria-invalid="true"]]:border-rose-400 relative border-dashed group has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-2 has-[:focus]:outline-blue-300 hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-center py-4 px-8 border border-neutral-400 items-center rounded-xl',
            isFileOverInput && "border-indigo-400 bg-indigo-50",
          )}
          onDragEnter={() => setIsFileOverInput(true)}
          onDragLeave={() => setIsFileOverInput(false)}
        >
          <ArrowUpFromLine
            className={classNameMerge(
              'transition-colors group-has-[:focus]:text-indigo-400 group-hover:text-indigo-400 group-has-[[aria-invalid="true"]]:text-rose-400',
              isFileOverInput ? "text-indigo-400" : "text-neutral-900",
            )}
          />
          <span className="text-neutral-900 font-medium text-[15px]">
            Drop your file or click here
          </span>
          <span className="text-xs text-neutral-500">
            Up to 512 <abbr>MB</abbr>
          </span>
          <input
            type="file"
            className="visually-hidden"
            aria-invalid={!!fileInputError}
            {...register("file", {
              required: "File is required!",
              validate: (value) => {
                return (
                  value[0].size <= 512_000_000 ||
                  "File size should be less than 512 MB!"
                );
              },
            })}
          />
        </label>
        {fileInputError && (
          <span role="alert" className="text-xs text-center text-rose-500">
            {fileInputError.message}
          </span>
        )}
        {fileInputValue && !fileInputError && (
          <div className="flex items-center text-[15px] text-neutral-900 bg-indigo-50 rounded-xl py-1.5 px-3 justify-between gap-8">
            <span className="truncate" title={fileInputValue[0].name}>
              {fileInputValue[0].name}
            </span>
            <span className="shrink-0">
              {getPrettySize(fileInputValue[0].size)[0]}{" "}
              <abbr>{getPrettySize(fileInputValue[0].size)[1]}</abbr>
            </span>
          </div>
        )}
      </div>
      <Button isLoading={isLoading}>Share</Button>
    </form>
  );
};
