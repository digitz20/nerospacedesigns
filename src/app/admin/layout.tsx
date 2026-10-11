import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Nerospace Designs",
  description: "Nerospace Designs admin panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-coffee-deep text-beige-light antialiased">
      {children}
    </div>
  );
}
