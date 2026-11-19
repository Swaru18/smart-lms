"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { courses } from "@/lib/mock/courses";
import { users } from "@/lib/mock/people";
import { useStore } from "@/lib/store";
import { SiteFrame } from "./chrome";

export function PublicCoursePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { setRole } = useStore();
  const course = courses.find((item) => item.id === params.id);

  if (!course || course.status !== "published") {
    return (
      <SiteFrame>
        <div className="mx-auto max-w-[760px] px-5 py-20 sm:px-8">
          <h1 className="text-[36px] font-semibold">This course is not in the public catalogue.</h1>
          <p className="mt-3 text-[15px] leading-7 text-muted">Draft courses stay inside the instructor and admin workspaces.</p>
          <Link href="/courses" className="mt-6 inline-flex h-11 items-center bg-teal px-5 text-[14px] font-semibold text-[#08211e]">Back to courses</Link>
        </div>
      </SiteFrame>
    );
  }

  const instructor = users.find((person) => person.id === course.instructorId);
  const lessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const minutes = course.modules.reduce((sum, module) => sum + module.lessons.reduce((inner, lesson) => inner + lesson.minutes, 0), 0);
  const courseId = course.id;

  function start() {
    setRole("learner");
    router.push(`/learn/courses/${courseId}`);
  }

  return (
    <SiteFrame>
      <div className="border-b border-line bg-shell">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)] lg:py-16">
          <div>
            <p className="text-[12px] font-medium tracking-[0.16em] text-teal uppercase">{course.category}</p>
            <h1 className="mt-3 text-[36px] leading-[1.12] font-semibold tracking-[-0.03em] sm:text-[48px]">{course.title}</h1>
            <p className="mt-4 max-w-xl text-[16px] leading-7 text-muted">{course.overview}</p>
            <p className="mt-4 text-[13px] text-muted">{course.level} · {lessons} lessons · about {minutes} minutes of sample material</p>
            {instructor ? (
              <p className="mt-5 text-[14px]">
                <span className="text-muted">Instructor · </span>
                <span className="font-medium">{instructor.name}</span>
                <span className="text-muted"> · {instructor.title}</span>
              </p>
            ) : null}
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={start} className="h-12 rounded-full bg-[#20B6A5] px-6 text-[14px] font-semibold text-[#08211e]">Start learning</button>
              <Link href="/courses" className="inline-flex h-12 items-center rounded-full border border-line px-6 text-[14px] font-semibold">All courses</Link>
            </div>
            <p className="mt-3 text-[12px] text-muted">Start learning opens the demo learner workspace. It does not create an account.</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src={course.cover} alt="" fill priority className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <h2 className="text-[24px] font-semibold">What you practice</h2>
          <ul className="mt-4 space-y-3">
            {course.outcomes.map((outcome) => (
              <li key={outcome} className="border-b border-line pb-3 text-[15px] leading-6">{outcome}</li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-[12px] tracking-[0.14em] text-muted uppercase">Sample progress</p>
            <div className="mt-3 h-1.5 bg-elevated"><div className="h-full w-[18%] bg-teal" /></div>
            <p className="mt-2 text-[13px] text-muted">Shown as a preview. Your own progress updates after you mark lessons complete in the workspace.</p>
          </div>
        </div>
        <div>
          <h2 className="text-[24px] font-semibold">Curriculum</h2>
          <ol className="mt-4 space-y-6">
            {course.modules.map((module, index) => (
              <li key={module.id}>
                <p className="text-[12px] font-medium text-teal">Module {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-[18px] font-semibold">{module.title}</h3>
                <p className="mt-1 text-[14px] leading-6 text-muted">{module.summary}</p>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-baseline justify-between gap-4 py-2.5 text-[14px]">
                      <span>{lesson.title}</span>
                      <span className="shrink-0 text-[12px] text-muted">{lesson.minutes} min · {lesson.type}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SiteFrame>
  );
}
