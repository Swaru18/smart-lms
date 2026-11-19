# Phase 2 architecture note

This prototype is frontend-only. Demo records live in the browser. Nothing in the interface authenticates a person, authorizes an action, takes payment, calls a model, sends a message, or stores a file.

When a buyer and a commercial model are clear, a reasonable next backend is Supabase:

- Auth for real sign-in, replacing the demo role switch.
- Postgres for organizations, people, courses, enrollments, submissions and announcements.
- Storage for lesson files and certificate assets.
- Row Level Security so a learner reads their own progress, an instructor reads their courses, and an owner reads the organization.
- Server-side functions for privileged work: inviting people, publishing a course, issuing a certificate, computing official reports.

Add a custom Node service only where Supabase is a poor fit: a provider integration, a scheduled job, or a workflow that should not live in the database. Do not rebuild Auth, storage or row-level access in a second backend without a specific reason.

Payments wait until pricing is decided. They are not part of the learning workspace itself.

The UI already reads and writes through `lib/store.tsx` and `lib/storage.ts`. A later adapter can replace those functions without redrawing the screens.
