import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { ToastViewport } from "@/components/ui";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Smart LMS", template: "%s · Smart LMS" },
  description: "Smart LMS is a frontend demo of a learning platform for courses, teaching and student progress. Accounts and payments are not connected.",
};

const themeBoot = `(function(){try{var t=localStorage.getItem("northroom.theme");if(t!=="light"&&t!=="dark"){var raw=localStorage.getItem("northroom.demo.v1");if(raw){var parsed=JSON.parse(raw);if(parsed.theme==="light"||parsed.theme==="dark")t=parsed.theme;}}document.documentElement.dataset.theme=t==="light"?"light":"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className="min-h-full bg-canvas text-ink">
        <StoreProvider>
          <ToastViewport />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
