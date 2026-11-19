import type { Metadata } from "next";
import { Suspense } from "react";
import { PublicCoursePage } from "@/components/marketing/course-public";

export const metadata: Metadata = { title: "Course" };

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-canvas" />}>
      <PublicCoursePage />
    </Suspense>
  );
}
