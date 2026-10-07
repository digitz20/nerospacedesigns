"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <Providers>
        <main className="flex-1">{children}</main>
      </Providers>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
    </>
  );
}
