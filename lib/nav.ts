import type { LucideIcon } from "lucide-react";
import {
  Award,
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Library,
  Megaphone,
  Settings,
  Users,
} from "lucide-react";
import type { Role } from "./types";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  group: string;
};

export const ROLE_HOME: Record<Role, string> = {
  admin: "/admin",
  instructor: "/teach",
  learner: "/learn",
};

export const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin",
  instructor: "Instructor",
  learner: "Learner",
};

export function navFor(role: Role): NavItem[] {
  if (role === "admin") {
    return [
      { href: "/admin", label: "Overview", icon: LayoutDashboard, group: "Organization" },
      { href: "/admin/people", label: "People", icon: Users, group: "Organization" },
      { href: "/admin/courses", label: "Courses", icon: BookOpen, group: "Organization" },
      { href: "/admin/reports", label: "Reports", icon: BarChart3, group: "Organization" },
      { href: "/admin/announcements", label: "Announcements", icon: Megaphone, group: "Organization" },
      { href: "/admin/calendar", label: "Calendar", icon: CalendarDays, group: "Organization" },
      { href: "/admin/settings", label: "Settings", icon: Settings, group: "Organization" },
    ];
  }
  if (role === "instructor") {
    return [
      { href: "/teach", label: "Overview", icon: LayoutDashboard, group: "Teaching" },
      { href: "/teach/courses", label: "Courses", icon: BookOpen, group: "Teaching" },
      { href: "/teach/learners", label: "Learners", icon: Users, group: "Teaching" },
      { href: "/teach/reviews", label: "Reviews", icon: ClipboardCheck, group: "Teaching" },
      { href: "/teach/analytics", label: "Analytics", icon: BarChart3, group: "Teaching" },
      { href: "/teach/calendar", label: "Calendar", icon: CalendarDays, group: "Teaching" },
    ];
  }
  return [
    { href: "/learn", label: "Home", icon: LayoutDashboard, group: "Learning" },
    { href: "/learn/catalogue", label: "Catalogue", icon: Library, group: "Learning" },
    { href: "/learn/assignments", label: "Assignments", icon: ClipboardCheck, group: "Learning" },
    { href: "/learn/assessments", label: "Assessments", icon: GraduationCap, group: "Learning" },
    { href: "/learn/calendar", label: "Calendar", icon: CalendarDays, group: "Learning" },
    { href: "/learn/achievements", label: "Achievements", icon: Award, group: "Learning" },
  ];
}

export function roleFromPath(pathname: string): Role | null {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/teach")) return "instructor";
  if (pathname.startsWith("/learn")) return "learner";
  return null;
}

export function titleFromPath(pathname: string, role: Role) {
  const items = navFor(role);
  const exact = items.find((item) => item.href === pathname);
  if (exact) return exact.label;
  if (pathname.includes("/lessons/")) return "Lesson";
  if (pathname.includes("/assessments/")) return "Assessment";
  if (pathname.includes("/reviews/")) return "Review";
  if (pathname.endsWith("/new") || pathname.includes("/courses/")) return "Course";
  if (pathname.startsWith("/account")) return "Profile";
  return items[0]?.label ?? "Smart LMS";
}
