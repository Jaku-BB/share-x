import { baseButtonClassName } from "~/app/components/button";
import { classNameMerge } from "~/app/utils/class-name-merge";
import { FileDown } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const BASE_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL as string;

const checkFileExistence = async (id: string) => {
  const fileServerRoute = BASE_SERVER_URL + "/file/" + id;

  const response = await fetch(fileServerRoute, {
    method: "HEAD",
  });

  return response.ok ? fileServerRoute : null;
};

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const fileServerRoute = await checkFileExistence(id);

  if (!fileServerRoute) {
    return notFound();
  }

  return (
    <main className="flex justify-start gap-8 flex-col items-center">
      <p className="text-neutral-900 text-center">
        File is up and ready for you!
      </p>
      <Link
        href={fileServerRoute}
        className={classNameMerge(baseButtonClassName, "gap-1.5")}
        download
      >
        <FileDown aria-hidden size={22} />
        Get File
      </Link>
    </main>
  );
};

export default Page;
