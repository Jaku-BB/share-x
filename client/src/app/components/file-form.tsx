"use client";

import { Button } from "~/app/components/button";
import { classNameMerge } from "~/app/utils/class-name-merge";
import { ArrowUpFromLine } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  file: File;
}

export const FileForm = () => {
  const [isFileOverInput, setIsFileOverInput] = useState(false);
  const { handleSubmit, register, formState } = useForm<FormData>();

  const onFormSubmission: SubmitHandler<FormData> = (data) => {
    console.log(data);
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
            Up to 500 <abbr>MB</abbr>
          </span>
          <input
            type="file"
            className="visually-hidden"
            aria-invalid={!!formState.errors.file}
            {...register("file", {
              required: "File is required!",
              // Add a custom validation rule to check the file size
            })}
          />
        </label>
        {formState.errors.file && (
          <span role="alert" className="text-xs text-center text-rose-500">
            {formState.errors.file.message}
          </span>
        )}
      </div>
      <Button>Share your file</Button>
    </form>
  );
};
