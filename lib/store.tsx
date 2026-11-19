"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createSeed } from "./mock/seed";
import { courseById, enrollmentView, flatLessons, sessionUser } from "./metrics";
import { demoStorage } from "./storage";
import { DEMO_TODAY, SESSION_USER, type Course, type DemoState, type OrgSettings, type QuizAttempt, type Role, type ThemeMode, type User } from "./types";
import { newId } from "./format";

type ToastTone = "success" | "info" | "danger";
type Toast = { id: string; title: string; tone: ToastTone };

type Store = {
  hydrated: boolean;
  state: DemoState;
  toasts: Toast[];
  toast: (title: string, tone?: ToastTone) => void;
  dismissToast: (id: string) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setRole: (role: Role) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  resetDemo: () => void;
  markNotification: (id: string, read: boolean) => void;
  markAllNotifications: () => void;
  enroll: (courseId: string) => void;
  setLessonComplete: (courseId: string, lessonId: string, complete: boolean) => void;
  submitQuiz: (quizId: string, answers: number[]) => QuizAttempt | null;
  submitAssignment: (courseId: string, body: string) => string | null;
  reviewSubmission: (id: string, score: number, feedback: string) => void;
  saveUser: (user: User) => void;
  saveSettings: (settings: OrgSettings) => void;
  addCategory: (name: string, description: string) => string | null;
  addAnnouncement: (input: { title: string; body: string; audience: DemoState["announcements"][number]["audience"] }) => void;
  createCourse: () => string;
  updateCourse: (courseId: string, recipe: (course: Course, draft: DemoState) => void) => void;
  publishCourse: (courseId: string) => string | null;
  unpublishCourse: (courseId: string) => void;
  discardDraft: (courseId: string) => void;
};

const StoreContext = createContext<Store | null>(null);

function produce(state: DemoState, recipe: (draft: DemoState) => void) {
  const draft = structuredClone(state);
  recipe(draft);
  return draft;
}

function pushActivity(draft: DemoState, text: string, roles: Role[], extra?: { learnerId?: string; instructorId?: string }) {
  draft.activity.unshift({
    id: newId("act"),
    at: new Date().toISOString(),
    text,
    roles,
    ...extra,
  });
  draft.activity = draft.activity.slice(0, 30);
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(() => createSeed());
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const stored = demoStorage.read();
    if (stored) setState(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    demoStorage.write(state);
    document.documentElement.dataset.theme = state.theme;
  }, [state, hydrated]);

  const api = useMemo<Store>(() => {
    const toast = (title: string, tone: ToastTone = "success") => {
      const id = newId("toast");
      setToasts((current) => [...current, { id, title, tone }]);
      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== id));
      }, 3600);
    };
    const patch = (recipe: (draft: DemoState) => void) => setState((current) => produce(current, recipe));

    return {
      hydrated,
      state,
      toasts,
      toast,
      dismissToast: (id) => setToasts((current) => current.filter((item) => item.id !== id)),
      setTheme: (theme) => patch((draft) => { draft.theme = theme; }),
      toggleTheme: () => patch((draft) => { draft.theme = draft.theme === "dark" ? "light" : "dark"; }),
      setRole: (role) => patch((draft) => { draft.role = role; }),
      setSidebarCollapsed: (collapsed) => patch((draft) => { draft.sidebarCollapsed = collapsed; }),
      resetDemo: () => {
        const next = createSeed();
        next.theme = state.theme;
        setState(next);
        toast("Demo data restored");
      },
      markNotification: (id, read) => patch((draft) => {
        const item = draft.notifications.find((note) => note.id === id);
        if (item) item.read = read;
      }),
      markAllNotifications: () => patch((draft) => {
        for (const note of draft.notifications) {
          if (note.roles.includes(draft.role)) note.read = true;
        }
      }),
      enroll: (courseId) => {
        const learner = sessionUser(state, "learner");
        const course = courseById(state, courseId);
        if (!learner || !course) return;
        if (state.enrollments.some((item) => item.learnerId === learner.id && item.courseId === courseId)) {
          toast("You are already enrolled in this demo", "info");
          return;
        }
        patch((draft) => {
          draft.enrollments.push({
            id: `${learner.id}-${courseId}`,
            learnerId: learner.id,
            courseId,
            completedLessonIds: [],
            enrolledAt: DEMO_TODAY,
          });
          pushActivity(draft, `${learner.name} enrolled in ${course.title}.`, ["admin", "instructor", "learner"], {
            learnerId: learner.id,
            instructorId: course.instructorId,
          });
        });
        toast(`Enrolled in ${course.title}`);
      },
      setLessonComplete: (courseId, lessonId, complete) => {
        const learner = sessionUser(state, "learner");
        const course = courseById(state, courseId);
        if (!learner || !course) return;
        const lesson = flatLessons(course).find((item) => item.id === lessonId);
        patch((draft) => {
          let enrollment = draft.enrollments.find((item) => item.learnerId === learner.id && item.courseId === courseId);
          if (!enrollment) return;
          const ids = new Set(enrollment.completedLessonIds);
          if (complete) ids.add(lessonId);
          else ids.delete(lessonId);
          enrollment.completedLessonIds = flatLessons(course).map((item) => item.id).filter((id) => ids.has(id));
          const view = enrollmentView(course, enrollment);
          if (view.status === "completed") enrollment.completedAt = enrollment.completedAt ?? DEMO_TODAY;
          else delete enrollment.completedAt;
          pushActivity(
            draft,
            complete
              ? `${learner.name} completed “${lesson?.title ?? "a lesson"}.”`
              : `${learner.name} reopened “${lesson?.title ?? "a lesson"}.”`,
            ["admin", "instructor", "learner"],
            { learnerId: learner.id, instructorId: course.instructorId },
          );
        });
        toast(complete ? "Lesson marked complete" : "Lesson marked incomplete");
      },
      submitQuiz: (quizId, answers) => {
        const learner = sessionUser(state, "learner");
        const quiz = state.quizzes.find((item) => item.id === quizId);
        if (!learner || !quiz) return null;
        const correct = quiz.questions.filter((question, index) => question.correctIndex === answers[index]).length;
        const score = Math.round((correct / quiz.questions.length) * 100);
        const attempt: QuizAttempt = {
          id: newId("attempt"),
          quizId,
          learnerId: learner.id,
          answers,
          score,
          submittedAt: new Date().toISOString(),
        };
        patch((draft) => {
          draft.attempts = draft.attempts.filter((item) => !(item.quizId === quizId && item.learnerId === learner.id));
          draft.attempts.push(attempt);
          const course = courseById(draft, quiz.courseId);
          const lessonId = quiz.lessonId;
          const enrollment = draft.enrollments.find((item) => item.learnerId === learner.id && item.courseId === quiz.courseId);
          if (enrollment && score >= 70 && !enrollment.completedLessonIds.includes(lessonId)) {
            enrollment.completedLessonIds.push(lessonId);
            if (course && enrollmentView(course, enrollment).status === "completed") {
              enrollment.completedAt = enrollment.completedAt ?? DEMO_TODAY;
            }
          }
          pushActivity(draft, `${learner.name} submitted ${quiz.title} (${score}%).`, ["admin", "instructor", "learner"], {
            learnerId: learner.id,
            instructorId: course?.instructorId,
          });
        });
        toast(score >= 70 ? `Checkpoint submitted · ${score}%` : `Submitted · ${score}%. You can try again.`);
        return attempt;
      },
      submitAssignment: (courseId, body) => {
        const learner = sessionUser(state, "learner");
        const course = courseById(state, courseId);
        if (!learner || !course?.assignment) return "This course has no assignment.";
        if (body.trim().length < 40) return "Write at least a short paragraph so the reviewer has something to read.";
        const existing = state.submissions.find((item) => item.learnerId === learner.id && item.courseId === courseId);
        if (existing) return "This assignment is already in the demo queue.";
        patch((draft) => {
          draft.submissions.unshift({
            id: newId("sub"),
            learnerId: learner.id,
            courseId,
            title: course.assignment!.title,
            body: body.trim(),
            submittedAt: new Date().toISOString(),
            status: "pending",
          });
          pushActivity(draft, `${learner.name} submitted “${course.assignment!.title}.”`, ["admin", "instructor", "learner"], {
            learnerId: learner.id,
            instructorId: course.instructorId,
          });
        });
        toast("Assignment submitted for demo review");
        return null;
      },
      reviewSubmission: (id, score, feedback) => {
        const reviewer = sessionUser(state, state.role === "learner" ? "instructor" : state.role);
        patch((draft) => {
          const submission = draft.submissions.find((item) => item.id === id);
          if (!submission) return;
          submission.status = "reviewed";
          submission.score = score;
          submission.feedback = feedback.trim();
          submission.reviewerId = reviewer?.id ?? SESSION_USER.instructor;
          submission.reviewedAt = new Date().toISOString();
          const learner = draft.users.find((user) => user.id === submission.learnerId);
          pushActivity(
            draft,
            `${reviewer?.name ?? "An instructor"} reviewed ${learner?.name ?? "a learner"}’s submission.`,
            ["admin", "instructor", "learner"],
            { learnerId: submission.learnerId, instructorId: reviewer?.id },
          );
        });
        toast("Feedback saved in this browser");
      },
      saveUser: (user) => {
        patch((draft) => {
          const index = draft.users.findIndex((item) => item.id === user.id);
          if (index >= 0) draft.users[index] = user;
          else draft.users.push(user);
        });
        toast(state.users.some((item) => item.id === user.id) ? "Person updated in the demo" : "Person added to the demo roster");
      },
      saveSettings: (settings) => {
        patch((draft) => { draft.settings = settings; });
        toast("Settings saved in this browser");
      },
      addCategory: (name, description) => {
        if (name.trim().length < 3) return "Give the category a name.";
        if (state.categories.some((item) => item.name.toLowerCase() === name.trim().toLowerCase())) {
          return "That category already exists.";
        }
        patch((draft) => {
          draft.categories.push({ id: newId("cat"), name: name.trim(), description: description.trim() });
        });
        toast("Category added");
        return null;
      },
      addAnnouncement: (input) => {
        const author = sessionUser(state, "admin");
        patch((draft) => {
          const id = newId("ann");
          draft.announcements.unshift({
            id,
            title: input.title.trim(),
            body: input.body.trim(),
            audience: input.audience,
            authorId: author?.id ?? "amira",
            createdAt: new Date().toISOString(),
          });
          draft.notifications.unshift({
            id: newId("note"),
            title: input.title.trim(),
            body: input.body.trim().slice(0, 140),
            href: "/admin/announcements",
            createdAt: new Date().toISOString(),
            read: false,
            roles: input.audience === "instructors" ? ["admin", "instructor"] : input.audience === "learners" ? ["admin", "learner"] : ["admin", "instructor", "learner"],
          });
        });
        toast("Announcement posted in the demo");
      },
      createCourse: () => {
        const id = newId("c");
        const instructor = sessionUser(state, state.role === "admin" ? "instructor" : "instructor");
        const instructorId = state.role === "instructor" ? sessionUser(state, "instructor")?.id ?? "jonah" : instructor?.id ?? "jonah";
        patch((draft) => {
          draft.courses.unshift({
            id,
            title: "Untitled course",
            category: draft.categories[0]?.name ?? "Professional Practice",
            level: "Beginner",
            status: "draft",
            summary: "",
            overview: "",
            outcomes: ["Describe what learners will be able to do."],
            instructorId,
            tags: [],
            cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&h=788&q=80",
            coverTint: "#3E5C54",
            updatedAt: new Date().toISOString(),
            modules: [
              {
                id: `${id}-m1`,
                title: "Module 1",
                summary: "The first stretch of practice.",
                lessons: [],
              },
            ],
          });
        });
        toast("Draft created in this browser");
        return id;
      },
      updateCourse: (courseId, recipe) => {
        patch((draft) => {
          const course = draft.courses.find((item) => item.id === courseId);
          if (!course) return;
          recipe(course, draft);
          course.updatedAt = new Date().toISOString();
        });
      },
      publishCourse: (courseId) => {
        const course = courseById(state, courseId);
        if (!course) return "Course not found.";
        if (course.title.trim().length < 4 || course.title === "Untitled course") return "Give the course a real title before publishing.";
        if (course.summary.trim().length < 12) return "Add a short summary.";
        const lessonCount = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
        if (lessonCount < 1) return "Add at least one lesson.";
        patch((draft) => {
          const current = draft.courses.find((item) => item.id === courseId);
          if (!current) return;
          current.status = "published";
          current.publishedAt = current.publishedAt ?? DEMO_TODAY;
          current.updatedAt = new Date().toISOString();
          pushActivity(draft, `${current.title} was published.`, ["admin", "instructor"], { instructorId: current.instructorId });
        });
        toast("Course published in the demo");
        return null;
      },
      unpublishCourse: (courseId) => {
        patch((draft) => {
          const course = draft.courses.find((item) => item.id === courseId);
          if (course) course.status = "draft";
        });
        toast("Course moved back to draft");
      },
      discardDraft: (courseId) => {
        const course = courseById(state, courseId);
        if (!course || course.status !== "draft") return;
        patch((draft) => {
          draft.courses = draft.courses.filter((item) => item.id !== courseId);
        });
        toast("Draft discarded");
      },
    };
  }, [hydrated, state, toasts]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used within StoreProvider");
  return store;
}
