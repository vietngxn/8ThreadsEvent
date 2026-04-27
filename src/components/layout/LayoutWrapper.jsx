"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideLayout =
    pathname === "/" ||
    pathname === "/highlight" ||
    pathname === "/page/login" ||
    pathname === "/page/register" ||
    pathname.startsWith("/artists");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}