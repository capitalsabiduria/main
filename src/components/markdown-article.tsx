import ReactMarkdown from 'react-markdown';

export function MarkdownArticle({ content }: { content: string }) {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl prose-headings:font-display prose-a:text-brandNavy">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
