"use client";

import { Button } from "~/app/components/button";
import { FilePreview } from "~/app/components/file-preview";
import { classNameMerge } from "~/app/utils/class-name-merge";
import { ArrowUpFromLine, Copy } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

interface FormData {
  fileList: FileList;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
const BASE_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL as string;

export const FileForm = () => {
  const [isFileOverInput, setIsFileOverInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, formState, watch, setError, reset } =
    useForm<FormData>();

  const fileInputValue = watch("fileList");
  const fileInputError = formState.errors.fileList;

  const onFormSubmission: SubmitHandler<FormData> = async (data) => {
    const requestBody = new FormData();
    requestBody.append("file", data.fileList[0]);

    try {
      setIsLoading(true);

      const response = await fetch(BASE_SERVER_URL + "/file", {
        method: "POST",
        body: requestBody,
      });

      if (!response.ok) {
        switch (response.status) {
          case 400:
            return setError("fileList", {
              message: "File is required!",
            });

          case 413:
            return setError("fileList", {
              message: "File size should be less than 512 MB!",
            });

          default:
            return toast.error("Error!", {
              description: "Please, try again...",
            });
        }
      }

      reset();

      const { fileId } = (await response.json()) as { fileId: string };

      toast.success("All done!", {
        description: "You can now copy and share this URL.",
        action: (
          <button
            className="p-0.5 text-neutral-900 ml-auto transition-colors hover:text-neutral-800"
            aria-label="Copy URL"
            onClick={async () => {
              try {
                const fileUrl = BASE_URL + "/file/" + fileId;
                await window.navigator.clipboard.writeText(fileUrl);

                toast.success("Copied!");
              } catch {
                toast.error("Error!");
              }
            }}
          >
            <Copy aria-hidden size={20} />
          </button>
        ),
        duration: 8000,
      });
    } catch (error) {
      toast.error("Error!", {
        description: "Please, try again...",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
              Up to 16 <abbr>MB</abbr>
            </span>
            <input
              type="file"
              className="visually-hidden"
              aria-invalid={!!fileInputError}
              {...register("fileList", {
                required: "File is required!",
                validate: (value) => {
                  return (
                    value[0].size <= 1024 * 1024 * 16 ||
                    "File size should be less than 16 MB!"
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
          {fileInputValue?.length > 0 && !fileInputError && (
            <FilePreview file={fileInputValue[0]} />
          )}
        </div>
        <Button isLoading={isLoading}>Share</Button>
      </form>
      <Toaster position="bottom-center" />
    </>
  );
};
