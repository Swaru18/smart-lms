import type { Metadata } from "next";
import { AboutPage } from "@/components/marketing/interior";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return <AboutPage />;
}
