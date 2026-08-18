import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container, Section } from '@/components/ui/layout-wrappers';
import { ArrowRight } from 'lucide-react';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { FloatingContact } from '@/components/ui/FloatingContact';

export const metadata = {
  title: 'Insights & Resources',
  description: 'Expert advice on web design, local SEO, and digital growth for Thai businesses.',
};

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1 flex flex-col">
      <Navbar />

      {/* One section — header and grid belong together, two stacked sections
          doubled the padding between the heading and its own cards. */}
      <Section id="insights" className="pt-32 pb-20 md:pt-40 md:pb-28">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
            Insights &amp; Resources
          </h1>
          <p className="text-[17px] text-brand-muted max-w-[600px] leading-relaxed mb-14">
            Expert advice on web design, local SEO, and digital growth to help your Bangkok business thrive online.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link href={`/insights/${post.slug}`} key={post.slug} className="group flex flex-col h-full bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:border-brand-teal/30 transition-colors">
                <div className="p-7 flex flex-col flex-1">
                  <div className="text-[12px] font-bold text-brand-teal uppercase tracking-wider mb-4">
                    {new Date(post.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="text-[20px] font-bold text-brand-text mb-3 group-hover:text-brand-teal transition-colors leading-snug">
                    {post.meta.title}
                  </h2>
                  <p className="text-[14px] text-brand-muted leading-relaxed mb-8 flex-1">
                    {post.meta.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-brand-teal font-semibold text-[13px] mt-auto">
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}

            {posts.length === 0 && (
              <div className="col-span-full py-12 text-center text-brand-muted">
                No insights published yet. Check back soon!
              </div>
            )}
          </div>
        </Container>
      </Section>

      <FinalCTA />
      <Footer />
      <FloatingContact />
    </main>
  );
}
