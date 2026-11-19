import { Suspense } from "react";
import { SkeletonBlock } from "@/components/ui";
import { AssessmentPlayer } from "@/components/workspaces/learning";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonBlock className="h-64" />}>
      <AssessmentPlayer />
    </Suspense>
  );
}
