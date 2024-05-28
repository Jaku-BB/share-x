import "./style.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const font = Inter({
  variable: "--main-font",
  subsets: ["latin"],
});

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={font.variable}>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
