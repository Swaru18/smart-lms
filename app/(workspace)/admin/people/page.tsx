import { Suspense } from "react";
import { SkeletonBlock } from "@/components/ui";
import { PeoplePage } from "@/components/workspaces/operations";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonBlock className="h-40" />}>
      <PeoplePage />
    </Suspense>
  );
}
