import React from 'react';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container, Section } from '@/components/ui/layout-wrappers';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { FloatingContact } from '@/components/ui/FloatingContact';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1 flex flex-col">
      <Navbar />

      {/* Header and article are one section — splitting them stacked two lots
          of section padding in the middle of a single piece of writing. */}
      <Section id="post" className="pt-32 pb-20 md:pt-40 md:pb-28">
        <Container className="max-w-[800px]">
          <Link href="/insights" className="inline-flex items-center gap-2 text-[14px] font-bold text-brand-teal hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
          <div className="text-[13px] font-bold text-brand-muted uppercase tracking-wider mb-4">
            {new Date(post.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-brand-text mb-10 leading-tight">
            {post.meta.title}
          </h1>

          <article className="prose prose-lg prose-headings:font-sans prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-a:text-brand-teal prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl w-full max-w-none border-t border-brand-border pt-10">
            <MDXRemote source={post.content} />
          </article>
        </Container>
      </Section>

      <FinalCTA />
      <Footer />
      <FloatingContact />
    </main>
  );
}
