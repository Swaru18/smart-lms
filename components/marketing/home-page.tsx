"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  LineChart,
  Megaphone,
  Presentation,
  Users,
} from "lucide-react";
import { courses } from "@/lib/mock/courses";
import { users } from "@/lib/mock/people";
import { JourneyCard } from "./forms";
import { SiteFrame } from "./chrome";

const features = [
  { icon: BookOpen, title: "Smart Course Management", text: "Publish a course, order its modules and keep a draft beside the live version." },
  { icon: Users, title: "Student Management", text: "See who is enrolled, who has gone quiet and who has finished." },
  { icon: Presentation, title: "Instructor Workspace", text: "A teaching desk for courses, the roster and the work waiting for a score." },
  { icon: BarChart3, title: "Learning Analytics", text: "Completion and activity drawn from the enrollments stored in this demo." },
  { icon: ClipboardCheck, title: "Assessments & Examinations", text: "Checkpoints and assignments sit inside the course, not in a separate pile." },
  { icon: LineChart, title: "Progress Tracking", text: "Lesson completion updates as a learner marks work done." },
  { icon: Award, title: "Certificates", text: "A local certificate preview unlocks when every lesson in a course is complete." },
  { icon: Megaphone, title: "Communication & Announcements", text: "Notices for learners and instructors stay inside the organization workspace." },
];

const stats = [
  { value: 20000, suffix: "+", label: "Learners" },
  { value: 500, suffix: "+", label: "Courses" },
  { value: 150, suffix: "+", label: "Expert Instructors" },
  { value: 95, suffix: "%", label: "Learning Satisfaction" },
];

const quotes = [
  { quote: "I could see the next lesson without hunting through a folder of files.", role: "Sample learner profile" },
  { quote: "The roster told me who had stalled before the week was over.", role: "Sample instructor profile" },
  { quote: "Course, assessment and completion lived in one place during the walkthrough.", role: "Sample institution profile" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(reduce ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 900);
        setCurrent(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce, value]);

  return <span ref={ref}>{current.toLocaleString("en-US")}{suffix}</span>;
}

export function HomePage() {
  const reduce = useReducedMotion();
  const published = courses.filter((course) => course.status === "published");
  const featured = published[0];
  const rest = published.slice(1, 4);
  const instructor = users.find((person) => person.id === featured?.instructorId);

  return (
    <SiteFrame>
      <section className="relative bg-[#111B29] text-white">
        <div className="relative min-h-[680px] lg:min-h-[780px]">
          <Image
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=2000&q=80"
            alt="Students studying together at a long table in a library"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#111B29]/58" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,27,41,0.82)_0%,rgba(17,27,41,0.42)_52%,rgba(17,27,41,0.28)_100%)]" />
          <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-5 pt-14 pb-28 sm:px-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.78fr)] lg:pt-16 lg:pb-36">
            <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <p className="text-[12px] font-medium tracking-[0.18em] text-[#8ee8dc]">SMART LEARNING MANAGEMENT PLATFORM</p>
              <h1 className="mt-4 max-w-[640px] text-[42px] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-[56px] lg:text-[64px]">
                Transform the way you <span className="text-[#20B6A5]">learn, teach and grow.</span>
              </h1>
              <p className="mt-5 max-w-[520px] text-[16px] leading-7 text-white/78 sm:text-[17px]">
                One intelligent learning platform to manage courses, empower educators, track student progress and create meaningful learning experiences.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/features" className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[14px] font-semibold text-[#172437] transition duration-200 hover:bg-[#e7f7f5]">Explore Platform</Link>
                <Link href="/courses" className="inline-flex h-12 items-center rounded-full border border-white/70 px-6 text-[14px] font-semibold text-white transition duration-200 hover:bg-white/10">Discover Courses</Link>
              </div>
            </motion.div>
            <motion.div initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12, ease }}>
              <JourneyCard />
            </motion.div>
          </div>
        </div>
        <div className="relative z-10 mx-auto -mt-16 max-w-[1180px] px-5 pb-2 sm:px-8 lg:-mt-20">
          <div className="bg-white text-[#172437] shadow-[0_16px_40px_rgba(17,27,41,0.12)]">
            <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[#e6edf4]">
              {stats.map((item) => (
                <div key={item.label} className="border-b border-[#e6edf4] px-5 py-5 last:border-b-0 sm:px-6 lg:border-b-0">
                  <p className="text-[28px] font-semibold tracking-tight tabular-nums sm:text-[32px]"><CountUp value={item.value} suffix={item.suffix} /></p>
                  <p className="mt-1 text-[13px] text-[#748196]">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="border-t border-[#e6edf4] px-5 py-2.5 text-[12px] text-[#748196] sm:px-6">Illustrative demo figures. Easy to replace. Not verified operating results.</p>
          </div>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
          <Reveal className="lg:col-span-5">
            <p className="text-[12px] font-medium tracking-[0.16em] text-teal uppercase">The platform</p>
            <h2 className="mt-3 text-[34px] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[42px]">Learning that moves you forward.</h2>
            <p className="mt-4 text-[16px] leading-7 text-muted">
              Smart LMS keeps a course, the people in it and the record of what they finished in one place. Educators publish the path. Learners continue where they left off. An institution can see completion without opening a separate spreadsheet.
            </p>
            <p className="mt-4 text-[16px] leading-7 text-muted">
              This release is a frontend demonstration. The courses, people and charts are sample records stored in your browser.
            </p>
            <Link href="/features" className="mt-7 inline-flex h-11 items-center rounded-full bg-teal px-5 text-[14px] font-semibold text-[#08211e] transition duration-200 hover:brightness-110">Explore the platform</Link>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <figure>
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
                  alt="Three people working together at a table with laptops"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              </div>
              <figcaption className="mt-3 text-[13px] text-muted">Study groups and teaching rooms are the setting. The product is the record of the work that happens there.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-shell">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-24">
          <Reveal>
            <p className="text-[12px] font-medium tracking-[0.16em] text-teal uppercase">Capabilities</p>
            <h2 className="mt-3 max-w-xl text-[34px] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[42px]">What the platform holds.</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-16 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={(index % 2) * 0.05}>
                  <div className="flex gap-4 border-b border-line py-5">
                    <Icon size={20} className="mt-0.5 shrink-0 text-teal" aria-hidden />
                    <div>
                      <h3 className="text-[17px] font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-[14px] leading-6 text-muted">{feature.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Link href="/features" className="mt-8 inline-flex text-[14px] font-semibold text-blue">Read how each part works</Link>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-medium tracking-[0.16em] text-teal uppercase">Learning experience</p>
              <h2 className="mt-3 max-w-xl text-[34px] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[42px]">A course with a next lesson.</h2>
            </div>
            <Link href="/courses" className="text-[14px] font-semibold text-blue">Browse the catalogue</Link>
          </Reveal>
          {featured ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <Reveal>
                <Link href={`/courses/${featured.id}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={featured.cover} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes="(min-width: 1024px) 58vw, 100vw" />
                  </div>
                  <p className="mt-4 text-[12px] tracking-[0.12em] text-muted uppercase">{featured.category} · {featured.level}</p>
                  <h3 className="mt-1 text-[26px] font-semibold tracking-tight">{featured.title}</h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-6 text-muted">{featured.summary}</p>
                  {instructor ? <p className="mt-3 text-[13px] text-muted">With {instructor.name}</p> : null}
                  <div className="mt-4 max-w-sm">
                    <div className="flex justify-between text-[12px] text-muted"><span>Sample lesson progress</span><span>62%</span></div>
                    <div className="mt-2 h-1.5 bg-elevated"><div className="h-full w-[62%] bg-teal" /></div>
                  </div>
                </Link>
              </Reveal>
              <div className="grid content-start gap-5">
                {rest.map((course) => (
                  <Reveal key={course.id}>
                    <Link href={`/courses/${course.id}`} className="grid grid-cols-[112px_minmax(0,1fr)] gap-4">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image src={course.cover} alt="" fill className="object-cover" sizes="112px" />
                      </div>
                      <span>
                        <span className="block text-[12px] text-muted">{course.category}</span>
                        <span className="mt-1 block text-[16px] font-semibold">{course.title}</span>
                        <span className="mt-1 block text-[13px] leading-5 text-muted">{course.level}</span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-t border-line bg-shell">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4]">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80"
                alt="People gathered around a table in a discussion"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[12px] font-medium tracking-[0.16em] text-teal uppercase">Educators and institutions</p>
            <h2 className="mt-3 text-[34px] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[42px]">A desk for the people who run the learning.</h2>
            <p className="mt-4 text-[16px] leading-7 text-muted">Instructors build the course and mark the work. An administrator watches enrollment, completion and what is still waiting for review.</p>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {[
                "Course creation, from a draft module to a published path.",
                "Student enrollment against a named course.",
                "Assignment management with a due date and a submission.",
                "Assessment management inside the curriculum.",
                "Attendance is represented here as activity and progress, not a separate register.",
                "Performance analytics from the demo enrollments.",
              ].map((item, index) => (
                <li key={item} className="flex gap-4 py-3 text-[15px] leading-6">
                  <span className="w-6 shrink-0 text-[13px] font-semibold text-teal">{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/login" className="inline-flex h-11 items-center rounded-full bg-teal px-5 text-[14px] font-semibold text-[#08211e]">Open a workspace</Link>
              <Link href="/institutions" className="inline-flex h-11 items-center rounded-full border border-line px-5 text-[14px] font-semibold">For institutions</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-24">
          <Reveal>
            <p className="text-[12px] font-medium tracking-[0.16em] text-teal uppercase">Sample voices</p>
            <h2 className="mt-3 max-w-xl text-[34px] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[42px]">Written for the demo, not collected from customers.</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">These lines illustrate the tone of the product. They are not endorsements, and they are not tied to a real person or organization.</p>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
            <Reveal>
              <blockquote className="border-l-2 border-teal pl-6">
                <p className="text-[26px] leading-[1.35] font-semibold tracking-[-0.02em] sm:text-[30px]">“{quotes[0]?.quote}”</p>
                <footer className="mt-4 text-[13px] text-muted">{quotes[0]?.role}</footer>
              </blockquote>
            </Reveal>
            <div className="grid gap-8">
              {quotes.slice(1).map((item) => (
                <Reveal key={item.role}>
                  <blockquote>
                    <p className="text-[17px] leading-7">“{item.quote}”</p>
                    <footer className="mt-2 text-[13px] text-muted">{item.role}</footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111B29] text-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <h2 className="max-w-xl text-[34px] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[44px]">Build a better learning experience with Smart LMS.</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/login" className="inline-flex h-12 items-center rounded-full bg-[#20B6A5] px-6 text-[14px] font-semibold text-[#08211e]">Get Started</Link>
            <Link href="/demo" className="inline-flex h-12 items-center rounded-full border border-white/50 px-6 text-[14px] font-semibold">Book a Demo</Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
