import { MetadataRoute } from 'next';
import { fetchJobs } from '@/features/user/jobs/services/jobs.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://emple.in';
  
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/jobs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/resources/roadmaps`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/resources/blogs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/resources/interview-questions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/resources/gate-notes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/resources/tutorials`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/resources/certificates`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/resources/sheets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/resources/career-paths`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/resources/bk-sde-sheet`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/resources/project-ideas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  try {
    const jobs = await fetchJobs();
    let jobsList: any[] = [];
    if (Array.isArray(jobs)) {
      jobsList = jobs;
    } else if (Array.isArray((jobs as any).data)) {
      jobsList = (jobs as any).data;
    } else if (Array.isArray((jobs as any).jobs)) {
      jobsList = (jobs as any).jobs;
    }

    const dynamicJobPages: MetadataRoute.Sitemap = jobsList.map((job: any) => {
      const slug = job.id || job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return {
        url: `${baseUrl}/jobs/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8
      };
    });

    return [...staticPages, ...dynamicJobPages];
  } catch (error) {
    // If fetching jobs fails, return just the static pages
    return staticPages;
  }
}
