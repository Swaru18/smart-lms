"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, ClipboardCheck, Plus, Users } from "lucide-react";
import { formatLongDate, formatRate, formatWhen, greeting } from "@/lib/format";
import {
  activeCourseDelta,
  attentionCourses,
  engagementBreakdown,
  learnerEnrollments,
  monthlyTrend,
  orgCompletion,
  peopleForInstructor,
  recommendationsFor,
  sessionUser,
  submissionsFor,
  upcomingEvents,
} from "@/lib/metrics";
import { useStore } from "@/lib/store";
import { DEMO_TODAY } from "@/lib/types";
import { UserDialog } from "../user-dialog";
import { Button, PageHeader, Pill } from "../ui";
import { CalendarPanel, CourseArt, CourseCard, CourseHealth, EngagementPanel, KpiCard, Panel, QuietLink, TrendChart } from "../widgets";

export function AdminHome() {
  const { state } = useStore();
  const [invite, setInvite] = useState(false);
  const person = sessionUser(state, "admin");
  const completion = orgCompletion(state);
  const engagement = engagementBreakdown(state);
  const courses = activeCourseDelta(state);
  const pending = state.submissions.filter((item) => item.status === "pending").length;
  const active = engagement.find((item) => item.key === "active")?.count ?? 0;
  const learnerDelta = active - state.learnerSnapshot.active;

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow={formatLongDate(DEMO_TODAY)}
        title={person ? greeting(person.name) : "Overview"}
        description="Learning operations for Smart LMS. Counts come from the seeded enrollments in this browser."
        actions={
          <>
            <Button variant="secondary" onClick={() => setInvite(true)}>Invite learner</Button>
            <Link href="/admin/courses/new" className="inline-flex h-10 items-center gap-2 rounded-[11px] bg-blue px-3.5 text-[14px] font-medium text-[var(--on-action)]"><Plus size={16} /> Create course</Link>
          </>
        }
      />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard href="/admin/people?engagement=active" label="Active learners" value={String(active)} hint={`${learnerDelta >= 0 ? "+" : ""}${learnerDelta} since the 31 Oct snapshot`} icon={<Users size={16} />} />
        <KpiCard href="/admin/courses?status=published" label="Active courses" value={String(courses.active)} hint={`${courses.delta >= 0 ? "+" : ""}${courses.delta} published since 1 Nov`} icon={<BookOpen size={16} />} />
        <KpiCard href="/admin/reports" label="Completion rate" value={formatRate(completion.completed, completion.total)} hint={`${completion.completed} of ${completion.total} enrollments`} icon={<ClipboardCheck size={16} />} />
        <KpiCard href="/admin/reports#reviews" label="Pending reviews" value={String(pending)} hint={`${state.reviewSnapshot.pending} on the 31 Oct snapshot`} icon={<ClipboardCheck size={16} />} />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="space-y-4 xl:col-span-8">
          <Panel title="Enrollment and completion" action={<QuietLink href="/admin/reports">Open reports</QuietLink>}>
            <p className="mb-2 text-[12px] text-muted">June–November 2026 · counts of enrollments and completed enrollments.</p>
            <TrendChart data={monthlyTrend(state.enrollments)} />
          </Panel>
          <CourseHealth rows={attentionCourses(state).slice(0, 4)} hrefFor={(course) => `/admin/courses/${course.id}`} />
        </div>
        <div className="space-y-4 xl:col-span-4">
          <EngagementPanel rows={engagement} total={engagement.reduce((sum, item) => sum + item.count, 0)} hrefFor={(key) => `/admin/people?engagement=${key}`} />
          <CalendarPanel events={state.events} weekStartsOn={state.settings.weekStartsOn} compact />
        </div>
      </div>
      <UserDialog open={invite} onClose={() => setInvite(false)} />
    </div>
  );
}

export function TeachHome() {
  const { state } = useStore();
  const person = sessionUser(state, "instructor");
  if (!person) return null;
  const mine = state.enrollments.filter((item) => state.courses.find((course) => course.id === item.courseId)?.instructorId === person.id);
  const completion = orgCompletion(state, mine);
  const learners = peopleForInstructor(state, person.id);
  const reviews = submissionsFor(state, person.id);
  const pending = reviews.filter((item) => item.status === "pending");
  const published = state.courses.filter((course) => course.instructorId === person.id && course.status === "published").length;

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow={formatLongDate(DEMO_TODAY)}
        title={greeting(person.name)}
        description="Your courses, the learners on them, and the reviews still open."
        actions={<Link href="/teach/reviews" className="inline-flex h-10 items-center rounded-[11px] bg-blue px-3.5 text-[14px] font-medium text-[var(--on-action)]">Open review queue</Link>}
      />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard href="/teach/courses" label="Published courses" value={String(published)} hint="Drafts stay off the catalogue" icon={<BookOpen size={16} />} />
        <KpiCard href="/teach/learners" label="Learners" value={String(learners.length)} hint="Unique people on your courses" icon={<Users size={16} />} />
        <KpiCard href="/teach/analytics" label="Completion rate" value={formatRate(completion.completed, completion.total)} hint={`${completion.completed} of ${completion.total} enrollments`} icon={<ClipboardCheck size={16} />} />
        <KpiCard href="/teach/reviews?status=pending" label="Pending reviews" value={String(pending.length)} hint="Waiting for a score and a note" icon={<ClipboardCheck size={16} />} />
      </div>
      <div className="grid gap-4 xl:grid-cols-12">
        <Panel className="xl:col-span-7" title="Needs a review" action={<QuietLink href="/teach/reviews">All reviews</QuietLink>}>
          <ul className="divide-y divide-line">
            {pending.map((submission) => {
              const learner = state.users.find((user) => user.id === submission.learnerId);
              const course = state.courses.find((item) => item.id === submission.courseId);
              return (
                <li key={submission.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-[14px] font-medium">{submission.title}</p>
                    <p className="text-[12px] text-muted">{learner?.name} · {course?.title}</p>
                  </div>
                  <Link href={`/teach/reviews/${submission.id}`} className="text-[13px] font-medium text-blue">Grade</Link>
                </li>
              );
            })}
          </ul>
        </Panel>
        <Panel className="xl:col-span-5" title="Recent activity">
          <ul className="space-y-3">
            {state.activity.filter((item) => item.roles.includes("instructor") && (!item.instructorId || item.instructorId === person.id)).slice(0, 5).map((item) => (
              <li key={item.id}>
                <p className="text-[13px] leading-5">{item.text}</p>
                <p className="text-[12px] text-muted">{formatWhen(item.at)}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

export function LearnHome() {
  const { state } = useStore();
  const person = sessionUser(state, "learner");
  if (!person) return null;
  const rows = learnerEnrollments(state, person.id);
  const current = rows.find((row) => row.view.status === "in_progress") ?? rows.find((row) => row.view.status !== "completed");
  const inProgress = rows.filter((row) => row.view.status === "in_progress").length;
  const completed = rows.filter((row) => row.view.status === "completed").length;
  const recommended = recommendationsFor(state, person.id).slice(0, 2);
  const deadlines = state.events.filter((event) => event.date >= DEMO_TODAY && rows.some((row) => row.course.id === event.courseId)).slice(0, 3);

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow={formatLongDate(DEMO_TODAY)}
        title={greeting(person.name)}
        description="Finish the comparison lesson before the evidence checkpoint on 20 November."
      />
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {current ? (
            <article className="overflow-hidden rounded-[14px] border border-line bg-card shadow-[var(--shadow)] lg:grid lg:grid-cols-5">
              <div className="lg:col-span-2">
                <CourseArt course={current.course} className="h-48 lg:h-full lg:aspect-auto" />
              </div>
              <div className="p-5 lg:col-span-3">
                <p className="text-[12px] font-medium text-teal">Continue learning</p>
                <h2 className="mt-1 text-[22px] font-semibold leading-tight">{current.course.title}</h2>
                <p className="mt-2 text-[14px] text-muted">{current.view.next ? `${current.view.next.module.title} · ${current.view.next.title}` : "Course complete"}</p>
                <p className="mt-3 text-[13px] text-muted">{current.view.done} of {current.view.total} lessons · {current.view.progress}%</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-elevated"><div className="h-full bg-teal" style={{ width: `${current.view.progress}%` }} /></div>
                {current.view.next ? (
                  <Link href={`/learn/courses/${current.course.id}/lessons/${current.view.next.id}`} className="mt-5 inline-flex h-10 items-center rounded-[11px] bg-blue px-3.5 text-[14px] font-medium text-[var(--on-action)]">Resume lesson</Link>
                ) : null}
              </div>
            </article>
          ) : null}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          <Link href="/learn/catalogue" className="rounded-[14px] border border-line bg-card p-4">
            <p className="text-[13px] text-muted">In progress</p>
            <p className="mt-1 text-[26px] font-semibold">{inProgress}</p>
          </Link>
          <Link href="/learn/achievements" className="rounded-[14px] border border-line bg-card p-4">
            <p className="text-[13px] text-muted">Completed courses</p>
            <p className="mt-1 text-[26px] font-semibold">{completed}</p>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Upcoming for you">
          <ul className="space-y-3">
            {deadlines.map((event) => (
              <li key={event.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[14px] font-medium">{event.title}</p>
                  <p className="text-[12px] text-muted">{formatLongDate(event.date)}</p>
                </div>
                <Pill tone={event.kind === "deadline" ? "orange" : "blue"}>{event.kind}</Pill>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Recent activity">
          <ul className="space-y-3">
            {state.activity.filter((item) => item.learnerId === person.id || (item.roles.includes("learner") && !item.learnerId)).slice(0, 4).map((item) => (
              <li key={item.id}>
                <p className="text-[13px] leading-5">{item.text}</p>
                <p className="text-[12px] text-muted">{formatWhen(item.at)}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <section>
        <div className="mb-3">
          <h2 className="text-[16px] font-semibold">Recommended for you</h2>
          <p className="text-[13px] text-muted">Matched from topics on courses you already have. Not a live recommendation service.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {recommended.map((item) => (
            <CourseCard
              key={item.course.id}
              course={item.course}
              instructor={state.users.find((user) => user.id === item.course.instructorId)}
              href={`/learn/courses/${item.course.id}`}
              action="View course"
              meta={`Shares ${item.overlap.join(", ")}`}
            />
          ))}
        </div>
      </section>
      <p className="text-[12px] text-muted">Next on the calendar: {upcomingEvents(state, DEMO_TODAY, 1)[0]?.title ?? "nothing else"}.</p>
    </div>
  );
}
