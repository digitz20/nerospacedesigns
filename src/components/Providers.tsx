"use client";

import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import GrainOverlay from "@/components/GrainOverlay";
import PageTransition from "@/components/PageTransition";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <GrainOverlay />
      <PageTransition>
        {children}
      </PageTransition>
    </>
  );
}
