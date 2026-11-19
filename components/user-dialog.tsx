"use client";

import { useState } from "react";
import { newId } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Engagement, Role, User, UserStatus } from "@/lib/types";
import { Button, Modal, SelectInput, TextArea, TextInput } from "./ui";

const colors = ["#2F6F8F", "#3E6B62", "#8C5A3C", "#5C5270", "#3D5E72", "#6E5344"];

export function UserDialog({
  open,
  initial,
  onClose,
}: {
  open: boolean;
  initial?: User | null;
  onClose: () => void;
}) {
  return (
    <Modal open={open} title={initial ? "Edit person" : "Add a demo person"} description="Saved in this browser only. No invitation is sent." onClose={onClose} wide>
      {open ? <UserForm key={initial?.id ?? "new"} initial={initial} onClose={onClose} /> : null}
    </Modal>
  );
}

function UserForm({ initial, onClose }: { initial?: User | null; onClose: () => void }) {
  const { saveUser } = useStore();
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [role, setRole] = useState<Role>(initial?.role ?? "learner");
  const [status, setStatus] = useState<UserStatus>(initial?.status ?? "active");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [engagement, setEngagement] = useState<Engagement>(initial?.engagement ?? "inactive");
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [error, setError] = useState("");

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (name.trim().length < 3) return setError("Enter a full name.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter an email-shaped address. It is not contacted.");
        if (title.trim().length < 2) return setError("Add a short title.");
        const user: User = {
          id: initial?.id ?? newId("user"),
          name: name.trim(),
          email: email.trim(),
          role,
          status,
          title: title.trim(),
          engagement: role === "learner" ? engagement : undefined,
          lastActive: initial?.lastActive ?? "2026-11-19",
          bio: bio.trim() || "Added in the demo roster.",
          color: initial?.color ?? colors[Math.floor(Math.random() * colors.length)],
        };
        saveUser(user);
        onClose();
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-[13px] font-medium">Name
          <TextInput className="mt-1.5" value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label className="block text-[13px] font-medium">Email
          <TextInput className="mt-1.5" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="block text-[13px] font-medium">Role
          <SelectInput className="mt-1.5" value={role} onChange={(event) => setRole(event.target.value as Role)}>
            <option value="learner">Learner</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </SelectInput>
        </label>
        <label className="block text-[13px] font-medium">Account status
          <SelectInput className="mt-1.5" value={status} onChange={(event) => setStatus(event.target.value as UserStatus)}>
            <option value="active">Active</option>
            <option value="invited">Invited</option>
            <option value="suspended">Suspended</option>
          </SelectInput>
        </label>
        <label className="block text-[13px] font-medium sm:col-span-2">Title
          <TextInput className="mt-1.5" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        {role === "learner" ? (
          <label className="block text-[13px] font-medium sm:col-span-2">Learning state
            <SelectInput className="mt-1.5" value={engagement} onChange={(event) => setEngagement(event.target.value as Engagement)}>
              <option value="active">Active</option>
              <option value="at_risk">At risk</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </SelectInput>
          </label>
        ) : null}
        <label className="block text-[13px] font-medium sm:col-span-2">Note
          <TextArea className="mt-1.5" value={bio} onChange={(event) => setBio(event.target.value)} />
        </label>
      </div>
      {error ? <p className="text-[13px] text-red" role="alert">{error}</p> : null}
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit">{initial ? "Save changes" : "Add person"}</Button>
      </div>
    </form>
  );
}
