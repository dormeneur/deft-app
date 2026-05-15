"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Utensils, Scissors, Shirt, Store, ShoppingCart, Database } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  Utensils: <Utensils className="w-6 h-6" />,
  Scissors: <Scissors className="w-6 h-6" />,
  Shirt: <Shirt className="w-6 h-6" />,
  Store: <Store className="w-6 h-6" />,
  ShoppingCart: <ShoppingCart className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
};

export function Services() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Section id="services" bg="muted">
      <Container>
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-medium text-brand-text mb-4"
          >
            {t.services.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-brand-muted max-w-[500px] mx-auto"
          >
            {t.services.sub}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t.services.items.map((srv, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 border border-brand-border/80 hover:border-brand-teal/30 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-300 group cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-teal-faint text-brand-teal flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-teal group-hover:text-white transition-all duration-300">
                {iconMap[srv.icon]}
              </div>
              <h3 className="text-xl font-bold font-sans text-brand-text mb-3">{srv.title}</h3>
              <p className="text-[15px] text-brand-muted leading-relaxed">
                {srv.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
