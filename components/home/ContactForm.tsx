"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type Fields = { name: string; email: string; message: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Fields) {
  const errors: Partial<Fields> = {};
  if (v.name.trim().length < 2) errors.name = "Add your name.";
  if (!emailPattern.test(v.email)) errors.email = "Use an address like name@company.com.";
  if (v.message.trim().length < 10) errors.message = "Write at least a sentence so I have context.";
  return errors;
}

const inputClass =
  "w-full rounded-xl bg-home-raised px-4 py-3 text-[15px] text-home-text placeholder:text-home-mute/60 ring-1 ring-home-line transition focus:outline-none focus:ring-2 focus:ring-home-accent";

export default function ContactForm() {
  const [values, setValues] = useState<Fields>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const errors = validate(values);

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="rounded-2xl bg-home-raised p-8 ring-1 ring-home-line">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-home-accent text-home-bg"><Check className="h-5 w-5" /></span>
        <p className="mt-5 font-fraunces text-2xl tracking-tight">Message sent</p>
        <p className="mt-2 text-sm text-home-mute">Thanks, {values.name.split(" ")[0]}. This demo form does not send anything, but the state is real.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {(
        [
          ["name", "Name", "text"],
          ["email", "Email", "email"],
        ] as const
      ).map(([key, label, type]) => (
        <div key={key}>
          <label htmlFor={key} className="mb-2 block text-sm text-home-mute">{label}</label>
          <input id={key} type={type} value={values[key]} onChange={update(key)} aria-invalid={submitted && !!errors[key]} aria-describedby={`${key}-error`} className={inputClass} />
          {submitted && errors[key] && <p id={`${key}-error`} className="mt-2 text-sm text-[#F28B6B]">{errors[key]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-home-mute">Project</label>
        <textarea id="message" rows={5} value={values.message} onChange={update("message")} aria-invalid={submitted && !!errors.message} aria-describedby="message-error" className={inputClass} />
        {submitted && errors.message && <p id="message-error" className="mt-2 text-sm text-[#F28B6B]">{errors.message}</p>}
      </div>
      <button type="submit" className="rounded-full bg-home-accent px-7 py-3 font-medium text-home-bg transition-transform duration-300 ease-out hover:-translate-y-0.5">
        Send message
      </button>
    </form>
  );
}
