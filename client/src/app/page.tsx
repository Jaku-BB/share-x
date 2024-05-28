import { FileForm } from "~/app/components/file-form";

const Page = () => {
  return (
    <main className="flex flex-col gap-8 items-center">
      <p className="text-neutral-900 text-center">
        Attach your file and share it
        <span className="block">
          {" "}
          with just <span className="font-medium">one</span> click!
        </span>
      </p>
      <FileForm />
    </main>
  );
};

export default Page;
