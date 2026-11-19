import type { Metadata } from "next";
import { FeaturesPage } from "@/components/marketing/interior";

export const metadata: Metadata = { title: "Features" };

export default function Page() {
  return <FeaturesPage />;
}
