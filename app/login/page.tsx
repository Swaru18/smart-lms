import type { Metadata } from "next";
import { LoginPage } from "@/components/marketing/interior";

export const metadata: Metadata = { title: "Login" };

export default function Page() {
  return <LoginPage />;
}
