"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  const { t } = useLanguage();
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    // Simulate EmailJS or server action
    setTimeout(() => {
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <Section id="contact" bg="muted">
      <Container>
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-medium text-brand-text mb-4"
          >
            {t.contact.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-brand-muted max-w-[500px] mx-auto"
          >
            {t.contact.sub}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-brand-border/80 shadow-xl shadow-brand-border/20"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input required placeholder={t.contact.fields.name} className="h-12 bg-brand-bg/50 border-brand-border text-[15px]" />
                <Input required type="email" placeholder={t.contact.fields.email} className="h-12 bg-brand-bg/50 border-brand-border text-[15px]" />
              </div>
              <Input placeholder={t.contact.fields.biz} className="h-12 bg-brand-bg/50 border-brand-border text-[15px]" />
              <Textarea required placeholder={t.contact.fields.msg} rows={5} className="resize-none bg-brand-bg/50 border-brand-border text-[15px] pt-4" />
              
              {formStatus === "sent" ? (
                <div className="w-full h-14 bg-brand-teal-faint text-brand-teal-dark flex items-center justify-center font-bold text-[15px] rounded-xl border border-brand-teal/20">
                  {t.contact.sent}
                </div>
              ) : (
                <Button disabled={formStatus === "sending"} type="submit" className="w-full h-14 bg-brand-teal hover:bg-brand-teal-dark text-white font-bold text-base rounded-xl shadow-none transition-all">
                  {formStatus === "sending" ? t.contact.sending : t.contact.send}
                </Button>
              )}

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-brand-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-brand-muted font-bold tracking-widest">OR</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full h-14 border-2 border-brand-border text-brand-text font-bold text-base rounded-xl bg-transparent hover:bg-brand-bg hover:border-brand-border transition-all flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-teal" />
                {t.contact.book}
              </Button>
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Map Container */}
            <div className="rounded-3xl overflow-hidden border border-brand-border/80 shadow-lg shadow-brand-border/10 bg-brand-bg aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] relative group">
              <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-transparent transition-colors pointer-events-none z-10" />
              <iframe
                src="https://maps.google.com/maps?q=Emporium+Tailors+535+Sukhumvit+Rd+Bangkok+Thailand&output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Deft Location"
                className="absolute inset-0 w-full h-full grayscale-[20%] contrast-125"
              />
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-3xl p-8 border border-brand-border/80 flex flex-col gap-6 shadow-sm">
              {[
                { icon: <Mail className="w-5 h-5" />, label: t.contact.labels.email, val: "work.adityabharti@gmail.com" },
                { icon: <Phone className="w-5 h-5" />, label: t.contact.labels.phone, val: "+66 063 823 2303" },
                { icon: <MessageCircle className="w-5 h-5" />, label: t.contact.labels.line, val: "aditya_bharti" },
                { icon: <MapPin className="w-5 h-5" />, label: t.contact.labels.address, val: "535 Sukhumvit Rd, Watthana, Bangkok 10110" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-teal border border-brand-border/60 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-brand-muted uppercase tracking-[0.1em] mb-1">
                      {item.label}
                    </div>
                    <div className="text-[15px] font-medium text-brand-text">
                      {item.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
