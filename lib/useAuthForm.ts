"use client";

import { useEffect, useRef, useState } from "react";

export type AuthMode = "login" | "signup";
type Key = "name" | "email" | "password" | "confirm";
type Status = "idle" | "loading" | "success" | "failed";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const passwordChecks = (pw: string) => [
  { label: "8 or more characters", ok: pw.length >= 8 },
  { label: "At least one number", ok: /\d/.test(pw) },
  { label: "One uppercase letter", ok: /[A-Z]/.test(pw) },
];

export const passwordStrength = (pw: string) => passwordChecks(pw).filter((c) => c.ok).length + (pw.length >= 12 ? 1 : 0);

function validate(mode: AuthMode, v: Record<Key, string>) {
  const errors: Partial<Record<Key, string>> = {};
  if (mode === "signup" && v.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!v.email) errors.email = "Enter your email address.";
  else if (!emailPattern.test(v.email)) errors.email = "That email looks incomplete. Try name@company.com.";
  if (!v.password) errors.password = "Enter your password.";
  else if (mode === "signup" && passwordChecks(v.password).some((c) => !c.ok)) errors.password = "Password needs 8 characters, a number and an uppercase letter.";
  if (mode === "signup" && v.confirm !== v.password) errors.confirm = "The two passwords do not match.";
  return errors;
}

export function useAuthForm(mode: AuthMode) {
  const [values, setValues] = useState<Record<Key, string>>({ name: "", email: "", password: "", confirm: "" });
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [showPassword, setShowPassword] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const errors = validate(mode, values);

  const field = (key: Key) => ({
    id: `${mode}-${key}`,
    name: key,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
      if (status === "failed") setStatus("idle");
    },
    onBlur: () => setTouched((prev) => ({ ...prev, [key]: true })),
    "aria-invalid": touched[key] && errors[key] ? (true as const) : undefined,
    "aria-describedby": touched[key] && errors[key] ? `${mode}-${key}-error` : undefined,
  });

  const error = (key: Key) => (touched[key] ? errors[key] : undefined);
  const valid = (key: Key) => Boolean(touched[key] && !errors[key] && values[key]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (Object.keys(errors).length > 0) return;
    setStatus("loading");
    timer.current = setTimeout(() => setStatus(mode === "login" && values.password === "wrongpass" ? "failed" : "success"), 1200);
  };

  return { values, field, error, valid, status, submit, showPassword, toggleShowPassword: () => setShowPassword((s) => !s), strength: passwordStrength(values.password) };
}
