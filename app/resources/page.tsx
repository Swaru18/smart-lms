import type { Metadata } from "next";
import { ResourcesPage } from "@/components/marketing/interior";

export const metadata: Metadata = { title: "Resources" };

export default function Page() {
  return <ResourcesPage />;
}
