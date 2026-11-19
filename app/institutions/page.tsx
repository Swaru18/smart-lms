import type { Metadata } from "next";
import { InstitutionsPage } from "@/components/marketing/interior";

export const metadata: Metadata = { title: "For Institutions" };

export default function Page() {
  return <InstitutionsPage />;
}
