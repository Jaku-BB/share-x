export const Header = () => {
  return (
    <header className="flex flex-col gap-2 md:gap-4 items-center">
      <h1 className="text-neutral-900 text-4xl font-medium md:text-5xl">
        ShareX
      </h1>
      <span className="bg-indigo-50 border uppercase border-indigo-500 md:text-lg font-black text-indigo-400 rounded-xl py-1 px-2">
        Free
      </span>
    </header>
  );
};
