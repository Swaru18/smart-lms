import type { Metadata } from "next";
import { HomePage } from "@/components/marketing/home-page";

export const metadata: Metadata = {
  title: "Smart LMS",
  description: "A learning platform to manage courses, support educators and follow student progress.",
};

export default function Page() {
  return <HomePage />;
}
