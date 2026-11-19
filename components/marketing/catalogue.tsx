"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { courses } from "@/lib/mock/courses";
import { users } from "@/lib/mock/people";
import { PageIntro, SiteFrame } from "./chrome";

const published = courses.filter((course) => course.status === "published");
const categories = ["All", ...Array.from(new Set(published.map((course) => course.category)))];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export function CataloguePage() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "All";
  const level = params.get("level") ?? "All";

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return published.filter((course) => {
      if (category !== "All" && course.category !== category) return false;
      if (level !== "All" && course.level !== level) return false;
      if (!needle) return true;
      return `${course.title} ${course.summary} ${course.category} ${course.tags.join(" ")}`.toLowerCase().includes(needle);
    });
  }, [q, category, level]);

  function update(next: { q?: string; category?: string; level?: string }) {
    const search = new URLSearchParams();
    const query = next.q ?? q;
    const nextCategory = next.category ?? category;
    const nextLevel = next.level ?? level;
    if (query.trim()) search.set("q", query.trim());
    if (nextCategory !== "All") search.set("category", nextCategory);
    if (nextLevel !== "All") search.set("level", nextLevel);
    const suffix = search.toString();
    router.replace(suffix ? `/courses?${suffix}` : "/courses", { scroll: false });
  }

  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Catalogue"
        title="Courses you can open in the demo."
        lede="Seven published courses sit in the sample catalogue. Filters and search run on this device. Opening a course shows the curriculum, then the learner workspace if you want to study it."
      />
      <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8">
        <div className="grid gap-3 border-b border-line pb-6 md:grid-cols-[minmax(0,1fr)_180px_180px]">
          <label className="block text-[12px] font-medium text-muted">
            Search
            <input className="field mt-1.5" value={q} onChange={(event) => update({ q: event.target.value })} placeholder="Title, topic or tag" />
          </label>
          <label className="block text-[12px] font-medium text-muted">
            Category
            <select className="field mt-1.5" value={category} onChange={(event) => update({ category: event.target.value })}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-[12px] font-medium text-muted">
            Level
            <select className="field mt-1.5" value={level} onChange={(event) => update({ level: event.target.value })}>
              {levels.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <p className="mt-5 text-[13px] text-muted">{results.length} course{results.length === 1 ? "" : "s"}</p>
        {results.length === 0 ? (
          <p className="mt-6 text-[15px] leading-7">Nothing in the demo catalogue matches those filters. Clear the search or choose All.</p>
        ) : (
          <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((course) => {
              const instructor = users.find((person) => person.id === course.instructorId);
              const lessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
              return (
                <li key={course.id}>
                  <Link href={`/courses/${course.id}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={course.cover} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                    </div>
                    <p className="mt-3 text-[12px] tracking-[0.12em] text-muted uppercase">{course.category}</p>
                    <h2 className="mt-1 text-[18px] font-semibold tracking-tight">{course.title}</h2>
                    <p className="mt-2 text-[14px] leading-6 text-muted">{course.summary}</p>
                    <p className="mt-3 text-[12px] text-muted">{course.level} · {lessons} lessons{instructor ? ` · ${instructor.name}` : ""}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </SiteFrame>
  );
}
