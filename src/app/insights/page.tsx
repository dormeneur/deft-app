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
  title: 'Insights',
  description: 'Notes on web design, local search and running a business online in Bangkok.',
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
          <h1 className="display-headline mb-6">Insights</h1>
          <p className="text-[17px] md:text-[19px] text-brand-muted max-w-[34rem] leading-relaxed mb-14 md:mb-20">
            Notes on web design, local search and running a business online in Bangkok.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts.map((post) => (
              <Link href={`/insights/${post.slug}`} key={post.slug} className="group flex flex-col h-full border-t border-brand-border hover:border-brand-teal transition-colors">
                <div className="pt-6 flex flex-col flex-1">
                  <div className="text-[14px] text-brand-subtle mb-4">
                    {new Date(post.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="font-heading text-[24px] font-semibold tracking-tight text-white mb-3 group-hover:text-brand-teal transition-colors leading-snug">
                    {post.meta.title}
                  </h2>
                  <p className="text-[16px] text-brand-muted leading-relaxed mb-8 flex-1">
                    {post.meta.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-white font-medium text-[15px] mt-auto">
                    Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}

            {posts.length === 0 && (
              <div className="col-span-full py-12 text-center text-brand-muted">
                Nothing published yet.
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
