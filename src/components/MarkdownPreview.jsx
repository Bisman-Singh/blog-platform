import { useMemo } from 'react';
import { marked } from 'marked';

marked.setOptions({
  breaks: true,
  gfm: true,
});

export default function MarkdownPreview({ content }) {
  const html = useMemo(() => {
    try {
      return marked(content || '');
    } catch {
      return '<p>Error rendering markdown</p>';
    }
  }, [content]);

  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />;
}
