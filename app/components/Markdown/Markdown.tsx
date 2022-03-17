import ReactMarkdown from 'react-markdown'

interface MarkdownProps {
  children: string
}

const Markdown = ({ children }: MarkdownProps) => {
  return (
    <article className="prose lg:prose-xl">
      <ReactMarkdown>{children}</ReactMarkdown>
    </article>
  )
}

export default Markdown
