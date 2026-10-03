"use client";

import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <PageTransition>
        {children}
      </PageTransition>
    </>
  );
}
