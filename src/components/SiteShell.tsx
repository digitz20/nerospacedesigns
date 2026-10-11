"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isSplash = pathname === "/splash";

  // Admin gets ZERO main-site chrome — no navbar/footer/chat/transitions/preloader
  if (isAdmin || isSplash) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <Providers>
        <main className="flex-1">{children}</main>
      </Providers>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
