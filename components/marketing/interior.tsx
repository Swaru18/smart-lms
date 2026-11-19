"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { ROLE_HOME } from "@/lib/nav";
import { useStore } from "@/lib/store";
import type { Role } from "@/lib/types";
import { PageIntro, SiteFrame } from "./chrome";
import { ContactForm, DemoForm } from "./forms";

const featureNotes = [
  { icon: BookOpen, title: "Smart Course Management", text: "Create a course, keep it in draft, then publish it. Modules and lessons stay in a fixed order a learner can follow." },
  { icon: Users, title: "Student Management", text: "The people directory lists learners, instructors and the organization owner. Status and last activity come from the sample records." },
  { icon: Presentation, title: "Instructor Workspace", text: "Jonah Ellis and Lena Cho each have courses, a roster and submissions. You can open that desk from the demo login." },
  { icon: BarChart3, title: "Learning Analytics", text: "Charts read the enrollments already in the browser. They update when you complete a lesson or reset the demo." },
  { icon: ClipboardCheck, title: "Assessments & Examinations", text: "Quizzes sit on lessons. Assignments have a prompt, a due date and a place to write a response." },
  { icon: LineChart, title: "Progress Tracking", text: "Marking a lesson complete writes that lesson id onto the enrollment. The course page shows the new share finished." },
  { icon: Award, title: "Certificates", text: "A certificate preview appears on the learner achievements page. It is labeled as a demo document, not a verified credential." },
  { icon: Megaphone, title: "Communication & Announcements", text: "Administrators can post a notice for learners, instructors or everyone. It appears in the notification list for that role." },
];

const resources = [
  {
    title: "Start from the performance, not the topic list",
    text: "A short course holds when the first line names what someone should do differently on a real task. The sample course Designing a Short Course walks through that cut: one outcome, one practice, one check. If the outline is a list of subjects, it is still a syllabus, not a module.",
  },
  {
    title: "Put the caveat next to the number",
    text: "Weekly reviews fail when the chart is asked to do the thinking. Evidence Before Charts asks you to write the decision, the comparison and the limit in the same place. Use it when a count has doubled and nobody has asked whether the pool of people doubled too.",
  },
  {
    title: "Design the mixed room you actually have",
    text: "Hybrid Session Craft is a 45-minute plan for a room where some people are remote. Count them before you design the activity. Silence on a call is often a design problem, not a personality.",
  },
];

const demos: Array<{ role: Role; name: string; title: string; text: string }> = [
  { role: "learner", name: "Maya Chen", title: "Student", text: "Resume a lesson, take a checkpoint and submit a short assignment." },
  { role: "instructor", name: "Jonah Ellis", title: "Instructor", text: "Open your courses, the roster and the submissions waiting for a score." },
  { role: "admin", name: "Amira Shah", title: "Institution", text: "See enrollment, completion, reviews and the courses that need attention." },
];

export function AboutPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="About"
        title="A learning platform with the record attached."
        lede="Smart LMS is built for schools, academies and workplace programs that need courses, teaching and progress in one interface. This website is the public face of that product. The workspaces behind Login are a working frontend demo."
      />
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="text-[28px] font-semibold tracking-tight">What you can trust in this release</h2>
          <p className="mt-4 text-[16px] leading-7 text-muted">Navigation, course filters, lesson completion, charts and forms all run in the browser. A role switch is a demo control. It is not authentication, and it does not check a password.</p>
          <p className="mt-4 text-[16px] leading-7 text-muted">A later phase can connect accounts, a database and file storage. Those services are not wired up here, and the interface does not pretend they are.</p>
        </div>
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80" alt="An open notebook and pen on a desk" fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-14 sm:px-8 md:grid-cols-3">
          {[
            ["Courses have a path", "A module is a sequence of lessons with a time and a type, not a pile of files."],
            ["Teaching has a desk", "Instructors see their own courses and the work that still needs a response."],
            ["Progress is visible", "Completion is a count of finished lessons, shown to the learner and the organization."],
          ].map(([title, text]) => (
            <div key={title} className="border-t border-teal pt-4">
              <h3 className="text-[18px] font-semibold">{title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteFrame>
  );
}

export function FeaturesPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Features"
        title="Eight parts of the learning operation."
        lede="Each item below is present in the demo workspaces. Open Login after you read them and the same names appear in the navigation."
      />
      <div className="mx-auto max-w-[860px] px-5 py-14 sm:px-8">
        {featureNotes.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-line py-7">
              <span className="pt-1 text-[13px] font-semibold text-teal">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="flex items-center gap-2 text-[22px] font-semibold"><Icon size={18} className="text-teal" aria-hidden />{feature.title}</h2>
                <p className="mt-2 text-[15px] leading-7 text-muted">{feature.text}</p>
              </div>
            </article>
          );
        })}
        <Link href="/login" className="mt-8 inline-flex h-11 items-center rounded-full bg-teal px-5 text-[14px] font-semibold text-[#08211e]">Open a demo workspace</Link>
      </div>
    </SiteFrame>
  );
}

export function InstitutionsPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="For institutions"
        title="Run the catalogue, the people and the reviews together."
        lede="An institution in this demo is the organization workspace. It is where courses are published, people are listed and completion is read across enrollments."
      />
      <div className="mx-auto grid max-w-[1180px] items-start gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1400&q=80" alt="Bookshelves in a library reading room" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div>
          <ol className="divide-y divide-line border-y border-line">
            {[
              ["Course creation", "Draft a course, add modules and publish when the path is ready."],
              ["Student enrollment", "Learners in the sample are already enrolled. New people can be invited inside the demo, and the record stays in this browser."],
              ["Assignment management", "Each published course can carry one assignment with a prompt and a due date."],
              ["Assessment management", "Quizzes are attached to lessons and scored in the learner workspace."],
              ["Progress monitoring", "Activity and completion stand in for attendance. There is no separate register in this phase."],
              ["Performance analytics", "The reports page charts completion from the seeded enrollments."],
            ].map(([title, text], index) => (
              <li key={title} className="py-4">
                <p className="text-[12px] font-semibold text-teal">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-1 text-[18px] font-semibold">{title}</h2>
                <p className="mt-1 text-[14px] leading-6 text-muted">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/login" className="inline-flex h-11 items-center rounded-full bg-teal px-5 text-[14px] font-semibold text-[#08211e]">Enter as an institution</Link>
            <Link href="/demo" className="inline-flex h-11 items-center rounded-full border border-line px-5 text-[14px] font-semibold">Book a demo</Link>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}

export function ResourcesPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Resources"
        title="Three notes from the sample courses."
        lede="These are short readings written for this demo. They point at courses you can open. They are not a journal and they do not cite outside studies."
      />
      <div className="mx-auto max-w-[760px] px-5 py-14 sm:px-8">
        {resources.map((item) => (
          <article key={item.title} className="border-b border-line py-8">
            <h2 className="text-[24px] font-semibold tracking-tight">{item.title}</h2>
            <p className="mt-3 text-[16px] leading-7 text-muted">{item.text}</p>
          </article>
        ))}
        <Link href="/courses" className="mt-8 inline-flex h-11 items-center rounded-full bg-teal px-5 text-[14px] font-semibold text-[#08211e]">Open the courses</Link>
      </div>
    </SiteFrame>
  );
}

export function ContactPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Contact"
        title="Write to the demo, or use the workspace."
        lede="Messages typed here stay in this browser. The email address is a placeholder for the product, not a monitored inbox."
      />
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2">
        <ContactForm />
        <div id="channels" className="scroll-mt-28">
          <h2 className="text-[22px] font-semibold">Support desk</h2>
          <dl className="mt-4 space-y-4 text-[15px]">
            <div>
              <dt className="text-[12px] tracking-[0.12em] text-muted uppercase">Email</dt>
              <dd className="mt-1"><a className="text-blue" href="mailto:support@smartlms.example">support@smartlms.example</a></dd>
            </div>
            <div>
              <dt className="text-[12px] tracking-[0.12em] text-muted uppercase">Hours</dt>
              <dd className="mt-1">Monday to Friday, 9:00–18:00</dd>
            </div>
            <div>
              <dt className="text-[12px] tracking-[0.12em] text-muted uppercase">Social channels</dt>
              <dd className="mt-1 leading-7 text-muted">The icons in the header are links to this note. Smart LMS does not operate live LinkedIn, Instagram or YouTube profiles in this demo.</dd>
            </div>
          </dl>
        </div>
      </div>
    </SiteFrame>
  );
}

export function LoginPage() {
  const router = useRouter();
  const { setRole } = useStore();
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Login"
        title="Choose a demo role."
        lede="There is no password. Choosing a person switches the workspace and keeps your edits in this browser. Do not treat this as a secure sign-in."
      />
      <div className="mx-auto max-w-[760px] px-5 py-12 sm:px-8">
        <ul className="divide-y divide-line border-y border-line">
          {demos.map((entry) => (
            <li key={entry.role}>
              <button
                type="button"
                className="flex w-full flex-col gap-1 py-5 text-left hover:text-teal sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                onClick={() => {
                  setRole(entry.role);
                  router.push(ROLE_HOME[entry.role]);
                }}
              >
                <span>
                  <span className="block text-[12px] tracking-[0.12em] text-muted uppercase">{entry.title}</span>
                  <span className="mt-1 block text-[20px] font-semibold">{entry.name}</span>
                </span>
                <span className="max-w-sm text-[14px] leading-6 text-muted">{entry.text}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] leading-6 text-muted">Reset is available inside each workspace if you want the original sample records back.</p>
      </div>
    </SiteFrame>
  );
}

export function DemoPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Book a demo"
        title="Tell us what you want to see."
        lede="The request is saved on this device so you can keep a note of it. It does not book a calendar slot or notify a person."
      />
      <div className="mx-auto max-w-[640px] px-5 py-14 sm:px-8">
        <DemoForm />
      </div>
    </SiteFrame>
  );
}

export function PrivacyPage() {
  return (
    <SiteFrame>
      <PageIntro eyebrow="Privacy" title="What this demo stores." lede="Smart LMS Phase 1 does not send your form entries to a server." />
      <article className="mx-auto max-w-[760px] px-5 py-12 text-[16px] leading-7 sm:px-8">
        <p>Journey requests, contact messages and demo bookings are written to localStorage in this browser. Course progress, announcements and profile edits use the same device storage.</p>
        <p className="mt-4">Clearing site data, or using Reset inside a workspace, removes those records from this browser. There is no account to delete on a server because no account is created.</p>
        <p className="mt-4">Photographs are loaded from Unsplash. The demo does not run analytics or advertising scripts of its own.</p>
        <p className="mt-4 text-muted">This page describes the demo. It is not a legal privacy policy for a live service.</p>
      </article>
    </SiteFrame>
  );
}

export function TermsPage() {
  return (
    <SiteFrame>
      <PageIntro eyebrow="Terms" title="How to use this demo." lede="Smart LMS on this site is a product demonstration, not a contracted learning service." />
      <article className="mx-auto max-w-[760px] px-5 py-12 text-[16px] leading-7 sm:px-8">
        <p>Sample courses, people and statistics are illustrative. The figures on the homepage are labeled as demo numbers and are not a claim about real learners or satisfaction.</p>
        <p className="mt-4">Certificates in the learner workspace are previews. They are not accredited credentials.</p>
        <p className="mt-4">Do not enter passwords, payment details or private student records. The forms are not a secure channel.</p>
        <p className="mt-4 text-muted">This page describes the demo. It is not a commercial terms agreement.</p>
      </article>
    </SiteFrame>
  );
}
