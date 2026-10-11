"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Copy, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { track } from "@/lib/tracking";

const EMAIL = "work.adityabharti@gmail.com";
const PHONE = "+66 63 823 2303";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  msg: z.string().min(10, "Tell us a little more (at least 10 characters)"),
});

type FormValues = z.infer<typeof formSchema>;

const FIELD = "bg-brand-surface border-brand-border text-[16px] md:text-[16px] text-white placeholder:text-brand-subtle";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} role="alert" className="text-red-400 text-[13px] mt-2">{message}</p>;
}

export function Contact({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("Email copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(`Copy failed — ${EMAIL}`);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          reply_to: data.email,
          user_email: data.email,
          message: data.msg,
          to_email: EMAIL,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      // Customer confirmation. Best-effort: the enquiry already reached us, so a
      // failure here must not turn the success toast into an error.
      const replyTemplate = process.env.NEXT_PUBLIC_EMAILJS_REPLY_TEMPLATE_ID;
      if (replyTemplate) {
        emailjs
          .send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            replyTemplate,
            { from_name: data.name, user_email: data.email },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
          )
          .catch((e: unknown) => console.error("EmailJS auto-reply failed:", e));
      }
      track.formSubmission("success");
      toast.success(t.contact.sent);
      reset();
    } catch (error: unknown) {
      console.error("EmailJS Error Details:", error);
      track.formSubmission("error");
      toast.error(`Your message didn't send. Please email us at ${EMAIL} instead.`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Section id="contact" className={className}>
      <Container>
        <h1 className="display-headline">Send us a message.</h1>
        <p className="mt-6 text-[17px] md:text-[19px] text-brand-muted max-w-[32rem] leading-relaxed">
          Tell us what you need and we&apos;ll reply within a day. Or scroll
          down and pick a time for a call.
        </p>

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14 lg:gap-20 items-start">

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 max-w-[620px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-[14px] font-medium text-white mb-2">
                  {t.contact.fields.name}
                </label>
                <Input
                  id="contact-name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  {...register("name")}
                  className={`h-12 px-4 ${FIELD}`}
                />
                <FieldError id="contact-name-error" message={errors.name?.message} />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[14px] font-medium text-white mb-2">
                  {t.contact.fields.email}
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  {...register("email")}
                  className={`h-12 px-4 ${FIELD}`}
                />
                <FieldError id="contact-email-error" message={errors.email?.message} />
              </div>
            </div>

            <div>
              <label htmlFor="contact-msg" className="block text-[14px] font-medium text-white mb-2">
                What do you need?
              </label>
              <Textarea
                id="contact-msg"
                rows={8}
                placeholder={t.contact.fields.msg}
                aria-invalid={!!errors.msg}
                aria-describedby={errors.msg ? "contact-msg-error" : undefined}
                {...register("msg")}
                className={`resize-none p-4 min-h-[200px] ${FIELD}`}
              />
              <FieldError id="contact-msg-error" message={errors.msg?.message} />
            </div>

            <button disabled={isSending} type="submit" className="btn-wipe btn-primary disabled:opacity-60 disabled:pointer-events-none">
              {isSending ? t.contact.sending : t.contact.send}
            </button>
          </form>

          {/* Direct lines — plain rows, no card stack */}
          <div className="text-[16px] text-brand-muted leading-relaxed">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email address ${EMAIL}`}
              className="group flex items-center gap-2 py-2 -mt-2 text-white text-left break-all"
            >
              <span className="link-rule">{EMAIL}</span>
              {copied
                ? <Check className="w-4 h-4 text-brand-teal shrink-0" />
                : <Copy className="w-4 h-4 text-brand-subtle group-hover:text-brand-teal transition-colors shrink-0" />}
            </button>

            <a href="tel:+66638232303" className="inline-block py-2 text-white hover:text-brand-teal transition-colors">{PHONE}</a>

            <SocialLinks className="mt-6" />

            <p className="mt-8 text-[15px]">
              535 Sukhumvit Rd, Watthana, Bangkok 10110
              <br />
              Mon–Fri · 09:00–18:00 ICT
            </p>
          </div>

        </div>
      </Container>
    </Section>
  );
}
