import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/insights');

export function getPostSlugs() {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
    return [];
  }
  return fs.readdirSync(contentDirectory).filter(file => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
}
