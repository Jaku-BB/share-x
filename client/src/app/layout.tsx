import "./style.css";
import { Header } from "~/app/components/header";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const font = Inter({
  variable: "--main-font",
  subsets: ["latin"],
});

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <div className="min-h-dvh px-2 py-8 grid grid-rows-[auto,_1fr,_auto] gap-8">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
