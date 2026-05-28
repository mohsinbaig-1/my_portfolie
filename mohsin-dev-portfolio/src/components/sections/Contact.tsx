"use client";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import type { ContactFormData } from "@/types";
import { motion } from "framer-motion";
import { Code2, Link2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

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
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to send");

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
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20";

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02]" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Together"
          description="Reach out for UE5 internships, game dev collaborations, or software engineering opportunities."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {[
              { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
              { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
              { icon: MapPin, label: "Location", value: siteConfig.location },
              { icon: Code2, label: "GitHub", value: "mohsinbaig-1", href: siteConfig.github },
              { icon: Link2, label: "LinkedIn", value: "mr-mohsin", href: siteConfig.linkedin },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="flex items-center gap-4 !p-4">
                  <item.icon className="h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-gray-200 hover:text-cyan-400" target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-200">{item.value}</p>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <GlassCard className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={inputClass}
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-red-400" role="alert">
                    {errors.subject}
                  </p>
                )}
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

              <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={status === "loading"}>
                <Send className="h-4 w-4" />
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>

              {status === "success" && (
                <p className="mt-4 text-sm text-emerald-400" role="status">
                  Message sent successfully. I will get back to you soon!
                </p>
              )}
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
