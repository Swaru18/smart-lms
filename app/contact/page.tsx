import type { Metadata } from "next";
import { ContactPage } from "@/components/marketing/interior";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return <ContactPage />;
}
