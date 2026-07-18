"use client";

import { AnimatedBorder } from "@/components/effects/AnimatedBorder";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import type { ContactFormData } from "@/types";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf } from "react-icons/fa6";

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

function validateForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!data.subject.trim()) errors.subject = "Subject is required";
  if (!data.message.trim()) errors.message = "Message is required";
  else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }
  return errors;
}

export function Contact() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");

    const { serviceId, templateId, publicKey } = siteConfig.emailjs;

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
            to_email: siteConfig.email,
          },
          publicKey,
        );
      } else {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!response.ok) throw new Error("Failed to send");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      const mailtoBody = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(form.subject)}&body=${mailtoBody}`;
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-colors focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20";

  const contactLinks = [
    { icon: FaEnvelope, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: FaGithub, label: "GitHub", value: siteConfig.githubUsername, href: siteConfig.github },
    { icon: FaLinkedin, label: "LinkedIn", value: "LinkedIn Profile", href: siteConfig.linkedin },
    { icon: FaFilePdf, label: "Resume", value: "Download PDF", href: siteConfig.resumePath },
  ];

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8" aria-labelledby="contact-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Connect"
          description="Open to gameplay programming roles, UE5 collaborations, and studio opportunities."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {contactLinks.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <AnimatedBorder>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    download={item.label === "Resume" ? true : undefined}
                    className="flex items-center gap-4 p-5 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="rounded-xl bg-cyan-500/15 p-3">
                      <item.icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-500">{item.label}</p>
                      <p className="text-sm font-medium text-gray-200">{item.value}</p>
                    </div>
                  </a>
                </AnimatedBorder>
              </motion.div>
            ))}
          </div>

          <AnimatedBorder className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  id="name"
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  error={errors.name}
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                />
              </div>

              <div className="mt-4">
                <FormField
                  id="subject"
                  label="Subject"
                  value={form.subject}
                  onChange={(v) => setForm({ ...form, subject: v })}
                  error={errors.subject}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={inputClass}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <MagneticButton type="submit" className="mt-6" disabled={status === "loading"}>
                <FaEnvelope className="h-4 w-4" />
                {status === "loading" ? "Sending..." : "Send Message"}
              </MagneticButton>

              {status === "success" && (
                <p className="mt-4 text-sm text-emerald-400" role="status">
                  Message sent successfully. I will get back to you soon.
                </p>
              )}
            </form>
          </AnimatedBorder>
        </div>
      </div>
    </section>
  );
}

function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-colors focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        aria-invalid={!!error}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
