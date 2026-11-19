import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6">
      <p className="text-[13px] text-muted">Smart LMS</p>
      <h1 className="mt-2 text-[28px] font-semibold">That page is not in the demo.</h1>
      <p className="mt-2 text-[14px] leading-6 text-muted">The link may be from an older draft. Return to the homepage and choose a page or a demo workspace.</p>
      <Link href="/" className="mt-5 inline-flex h-10 w-fit items-center rounded-[11px] bg-blue px-3.5 text-[14px] font-medium text-[var(--on-action)]">Back to Smart LMS</Link>
    </main>
  );
}
