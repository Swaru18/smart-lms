import { Suspense } from "react";
import { SkeletonBlock } from "@/components/ui";
import { CourseManager } from "@/components/workspaces/operations";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonBlock className="h-40" />}>
      <CourseManager base="/admin/courses" />
    </Suspense>
  );
}
