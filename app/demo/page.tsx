import type { Metadata } from "next";
import { DemoPage } from "@/components/marketing/interior";

export const metadata: Metadata = { title: "Book a demo" };

export default function Page() {
  return <DemoPage />;
}
