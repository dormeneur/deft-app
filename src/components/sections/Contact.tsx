"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Mail, Phone, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const EMAIL = "work.adityabharti@gmail.com";
const PHONE = "+66 063 823 2303";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  msg: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

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
      toast.success(t.contact.sent);
      reset();
    } catch (error: unknown) {
      const err = error as { text?: string; message?: string };
      console.error("EmailJS Error Details:", error);
      toast.error(`Error: ${err?.text || err?.message || "Failed to send message."}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Section id="contact" className={className}>
      <Container>
        {/* Heading spans both columns so they start on the same line */}
        <h2 className="section-headline mb-4">Send us a message</h2>
        <p className="text-[17px] text-brand-muted mb-14 max-w-[460px]">
          Tell us what you need. We reply within a day — or scroll down and
          pick a time that suits you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-start">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-[620px]">
              {/* Name + email share a row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    {...register("name")}
                    placeholder={t.contact.fields.name}
                    className="h-12 bg-brand-surface border-brand-border text-[15px] px-4"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
                </div>
                <div>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder={t.contact.fields.email}
                    className="h-12 bg-brand-surface border-brand-border text-[15px] px-4"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <Textarea
                  {...register("msg")}
                  placeholder={t.contact.fields.msg}
                  rows={9}
                  className="resize-none bg-brand-surface border-brand-border text-[15px] p-4 min-h-[220px]"
                />
                {errors.msg && <p className="text-red-400 text-xs mt-1.5">{errors.msg.message}</p>}
              </div>

              <Button
                disabled={isSending}
                type="submit"
                className="btn-wipe h-11 px-8 bg-brand-teal text-black font-bold text-[14px] rounded-full glow-teal"
              >
                {isSending ? t.contact.sending : t.contact.send}
              </Button>
            </form>
          </motion.div>

          {/* Direct lines — plain rows, no card stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <button
              type="button"
              onClick={copyEmail}
              className="group flex items-center gap-3 text-left mb-5"
            >
              <Mail className="w-[18px] h-[18px] text-brand-teal shrink-0" />
              <span className="text-[15px] font-medium text-white group-hover:text-brand-teal transition-colors">
                {EMAIL}
              </span>
              {copied
                ? <Check className="w-4 h-4 text-brand-teal shrink-0" />
                : <Copy className="w-4 h-4 text-[#555] group-hover:text-brand-teal transition-colors shrink-0" />}
            </button>

            <a href="tel:+66638232303" className="group flex items-center gap-3 mb-10">
              <Phone className="w-[18px] h-[18px] text-brand-teal shrink-0" />
              <span className="text-[15px] font-medium text-white group-hover:text-brand-teal transition-colors">
                {PHONE}
              </span>
            </a>

            <SocialLinks />

            <p className="text-[13px] text-[#555] mt-10 leading-relaxed">
              535 Sukhumvit Rd, Watthana, Bangkok 10110
              <br />
              Mon–Fri · 09:00–18:00 ICT
            </p>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
