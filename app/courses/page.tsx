import type { Metadata } from "next";
import { Suspense } from "react";
import { CataloguePage } from "@/components/marketing/catalogue";

export const metadata: Metadata = { title: "Courses" };

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-canvas" />}>
      <CataloguePage />
    </Suspense>
  );
}
