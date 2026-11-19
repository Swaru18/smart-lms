import type { Metadata } from "next";
import { TermsPage } from "@/components/marketing/interior";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function Page() {
  return <TermsPage />;
}