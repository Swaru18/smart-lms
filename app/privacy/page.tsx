import type { Metadata } from "next";
import { PrivacyPage } from "@/components/marketing/interior";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return <PrivacyPage />;
}
