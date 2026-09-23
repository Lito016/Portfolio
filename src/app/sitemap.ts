import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { allRoutes } from '@/config/navigation';
import { featuredProjects } from '@/data/projects';
import { blogPosts } from '@/data/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes: MetadataRoute.Sitemap = allRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));
  const caseStudies: MetadataRoute.Sitemap = featuredProjects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));
  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  return [...staticRoutes, ...caseStudies, ...posts];
}
