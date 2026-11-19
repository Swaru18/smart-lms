import { Suspense } from "react";
import { SkeletonBlock } from "@/components/ui";
import { CourseBuilder } from "@/components/workspaces/builder";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonBlock className="h-40" />}>
      <CourseBuilder base="/admin/courses" />
    </Suspense>
  );
}
