import { ContentCard } from '@/components/content-card';
import { getPublishedNewsletters } from '@/lib/data/content';

export default async function NewsletterIndexPage() {
  const newsletters = await getPublishedNewsletters();

  return (
    <div>
      <h1 className="font-display text-4xl text-brandNavy">Money Talks India</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {newsletters.map((issue) => (
          <ContentCard
            key={issue.id}
            href={`/newsletter/${issue.slug}`}
            title={issue.title}
            excerpt={issue.excerpt}
            meta={`Edition ${issue.edition_number}`}
            badge={issue.members_only ? 'Members Only' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
