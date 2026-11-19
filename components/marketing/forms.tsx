"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROLE_HOME } from "@/lib/nav";
import { useStore } from "@/lib/store";
import type { Role } from "@/lib/types";

const fieldClass = "mt-1.5 h-11 w-full border border-[#d7e0ea] bg-white px-3 text-[14px] text-[#172437] outline-none transition-colors focus:border-[#20B6A5]";
const labelClass = "block text-[12px] font-medium text-[#5d6d80]";

export const INTERESTS = [
  "Data and analytics",
  "Learning design",
  "Professional practice",
  "Institutional rollout",
  "Not sure yet",
] as const;

const ROLE_MAP: Record<string, Role> = {
  Student: "learner",
  Instructor: "instructor",
  Institution: "admin",
};

function readList(key: string) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveItem(key: string, item: Record<string, string>) {
  const next = readList(key).slice(-19);
  next.push(item);
  localStorage.setItem(key, JSON.stringify(next));
}

export function JourneyCard() {
  const router = useRouter();
  const { setRole } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRoleName] = useState("");
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (!role) next.role = "Select a role.";
    if (!interest) next.interest = "Select a learning interest.";
    setErrors(next);
    if (Object.keys(next).length) return;
    saveItem("smartlms.enquiries", {
      name: name.trim(),
      email: email.trim(),
      role,
      interest,
      createdAt: new Date().toISOString(),
    });
    setSaved(true);
  }

  function enter() {
    const mapped = ROLE_MAP[role] ?? "learner";
    setRole(mapped);
    router.push(ROLE_HOME[mapped]);
  }

  return (
    <div className="bg-white p-6 text-[#172437] shadow-[0_22px_50px_rgba(8,14,24,0.28)] sm:p-7" style={{ colorScheme: "light" }}>
      <h2 className="text-[24px] leading-tight font-semibold tracking-[-0.02em]">Start your learning journey</h2>
      {saved ? (
        <div className="mt-5">
          <p className="text-[15px] leading-6">Saved in this browser for {name.trim()}.</p>
          <p className="mt-2 text-[13px] leading-6 text-[#748196]">This demo does not create an account or send email. You can open the workspace that matches the role you selected.</p>
          <button type="button" onClick={enter} className="mt-5 h-11 w-full bg-[#20B6A5] text-[14px] font-semibold text-[#08211e] transition duration-200 hover:bg-[#2ccbb8]">Open the demo workspace</button>
        </div>
      ) : (
        <form className="mt-5 grid gap-3.5" onSubmit={submit} noValidate>
          <label className={labelClass}>
            Full name
            <input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
            {errors.name ? <span className="mt-1 block text-[12px] font-normal text-[#c4533a]">{errors.name}</span> : null}
          </label>
          <label className={labelClass}>
            Email address
            <input className={fieldClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
            {errors.email ? <span className="mt-1 block text-[12px] font-normal text-[#c4533a]">{errors.email}</span> : null}
          </label>
          <label className={labelClass}>
            Select your role
            <select className={fieldClass} value={role} onChange={(event) => setRoleName(event.target.value)}>
              <option value="">Student, instructor or institution</option>
              <option>Student</option>
              <option>Instructor</option>
              <option>Institution</option>
            </select>
            {errors.role ? <span className="mt-1 block text-[12px] font-normal text-[#c4533a]">{errors.role}</span> : null}
          </label>
          <label className={labelClass}>
            Select your learning interest
            <select className={fieldClass} value={interest} onChange={(event) => setInterest(event.target.value)}>
              <option value="">Choose an interest</option>
              {INTERESTS.map((item) => <option key={item}>{item}</option>)}
            </select>
            {errors.interest ? <span className="mt-1 block text-[12px] font-normal text-[#c4533a]">{errors.interest}</span> : null}
          </label>
          <button type="submit" className="mt-1 h-11 bg-[#20B6A5] text-[14px] font-semibold text-[#08211e] transition duration-200 hover:bg-[#2ccbb8]">Get Started</button>
          <p className="text-[13px] text-[#748196]">Your next learning experience starts here.</p>
        </form>
      )}
    </div>
  );
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (message.trim().length < 12) next.message = "Write at least a short note.";
    setErrors(next);
    if (Object.keys(next).length) return;
    saveItem("smartlms.messages", { name: name.trim(), email: email.trim(), message: message.trim(), createdAt: new Date().toISOString() });
    setSaved(true);
  }

  if (saved) {
    return <p className="border border-line bg-shell p-5 text-[15px] leading-7">Saved on this device. Nothing was emailed. The support address above is a demo contact, not a monitored inbox.</p>;
  }

  return (
    <form className="grid gap-4" onSubmit={submit} noValidate>
      <label className="block text-[13px] font-medium">
        Full name
        <input className="field mt-1.5" value={name} onChange={(event) => setName(event.target.value)} />
        {errors.name ? <span className="mt-1 block text-[12px] font-normal text-red">{errors.name}</span> : null}
      </label>
      <label className="block text-[13px] font-medium">
        Email address
        <input className="field mt-1.5" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        {errors.email ? <span className="mt-1 block text-[12px] font-normal text-red">{errors.email}</span> : null}
      </label>
      <label className="block text-[13px] font-medium">
        Message
        <textarea className="field mt-1.5 min-h-32" value={message} onChange={(event) => setMessage(event.target.value)} />
        {errors.message ? <span className="mt-1 block text-[12px] font-normal text-red">{errors.message}</span> : null}
      </label>
      <button type="submit" className="h-11 w-fit bg-teal px-5 text-[14px] font-semibold text-[#08211e]">Send message</button>
    </form>
  );
}

export function DemoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRoleName] = useState("");
  const [when, setWhen] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (organization.trim().length < 2) next.organization = "Enter an organization name.";
    if (!role) next.role = "Select a role.";
    if (!when) next.when = "Choose a preferred time.";
    setErrors(next);
    if (Object.keys(next).length) return;
    saveItem("smartlms.demos", {
      name: name.trim(),
      email: email.trim(),
      organization: organization.trim(),
      role,
      when,
      note: note.trim(),
      createdAt: new Date().toISOString(),
    });
    setSaved(true);
  }

  if (saved) {
    return (
      <div className="border border-line bg-shell p-6">
        <h2 className="text-[22px] font-semibold">Request kept on this device</h2>
        <p className="mt-3 text-[15px] leading-7 text-muted">No calendar invite is sent. Open a demo workspace now if you want to walk through the product yourself.</p>
        <a href="/login" className="mt-5 inline-flex h-11 items-center bg-teal px-5 text-[14px] font-semibold text-[#08211e]">Choose a demo role</a>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={submit} noValidate>
      <label className="block text-[13px] font-medium">Full name<input className="field mt-1.5" value={name} onChange={(event) => setName(event.target.value)} />{errors.name ? <span className="mt-1 block text-[12px] font-normal text-red">{errors.name}</span> : null}</label>
      <label className="block text-[13px] font-medium">Work email<input className="field mt-1.5" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />{errors.email ? <span className="mt-1 block text-[12px] font-normal text-red">{errors.email}</span> : null}</label>
      <label className="block text-[13px] font-medium">Organization<input className="field mt-1.5" value={organization} onChange={(event) => setOrganization(event.target.value)} />{errors.organization ? <span className="mt-1 block text-[12px] font-normal text-red">{errors.organization}</span> : null}</label>
      <label className="block text-[13px] font-medium">
        Role
        <select className="field mt-1.5" value={role} onChange={(event) => setRoleName(event.target.value)}>
          <option value="">Select</option>
          <option>Student</option>
          <option>Instructor</option>
          <option>Institution</option>
        </select>
        {errors.role ? <span className="mt-1 block text-[12px] font-normal text-red">{errors.role}</span> : null}
      </label>
      <label className="block text-[13px] font-medium">
        Preferred time
        <select className="field mt-1.5" value={when} onChange={(event) => setWhen(event.target.value)}>
          <option value="">Select a window</option>
          <option>Weekday morning</option>
          <option>Weekday afternoon</option>
          <option>I will explore the demo myself</option>
        </select>
        {errors.when ? <span className="mt-1 block text-[12px] font-normal text-red">{errors.when}</span> : null}
      </label>
      <label className="block text-[13px] font-medium">What you want to see<textarea className="field mt-1.5 min-h-28" value={note} onChange={(event) => setNote(event.target.value)} /></label>
      <button type="submit" className="h-11 w-fit bg-teal px-5 text-[14px] font-semibold text-[#08211e]">Book a demo</button>
      <p className="text-[13px] leading-6 text-muted">Stored locally. This does not schedule a meeting.</p>
    </form>
  );
}
