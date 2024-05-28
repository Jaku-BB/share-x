"use client";

export const Footer = () => {
  return (
    <footer className="text-center">
      <small className="text-xs md:text-base text-neutral-500">
        &copy; {new Date().getFullYear()}
      </small>
    </footer>
  );
};
