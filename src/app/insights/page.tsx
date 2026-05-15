import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container, Section } from '@/components/ui/layout-wrappers';
import { ArrowRight } from 'lucide-react';
import { FloatingContact } from '@/components/ui/FloatingContact';

export const metadata = {
  title: 'Insights & Resources',
  description: 'Expert advice on web design, local SEO, and digital growth for Thai businesses.',
};

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      
      <Section id="insights-header" bg="muted" className="pt-32 pb-16">
        <Container>
          <h1 className="text-4xl md:text-5xl font-heading font-medium text-brand-text mb-4">
            Insights & Resources
          </h1>
          <p className="text-[17px] text-brand-muted max-w-[600px] leading-relaxed">
            Expert advice on web design, local SEO, and digital growth to help your Bangkok business thrive online.
          </p>
        </Container>
      </Section>

      <Section id="insights-grid" bg="white" className="py-16 flex-1">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/insights/${post.slug}`} key={post.slug} className="group flex flex-col h-full bg-white rounded-2xl border border-brand-border/60 overflow-hidden hover:border-brand-teal/30 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-300">
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-[13px] font-bold text-brand-teal uppercase tracking-wider mb-4">
                    {new Date(post.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="text-2xl font-bold font-sans text-brand-text mb-3 group-hover:text-brand-teal transition-colors">
                    {post.meta.title}
                  </h2>
                  <p className="text-[15px] text-brand-muted leading-relaxed mb-8 flex-1">
                    {post.meta.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-brand-text font-bold text-[14px] mt-auto">
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

      <Footer />
      <FloatingContact />
    </main>
  );
}
