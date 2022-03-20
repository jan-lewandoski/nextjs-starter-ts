import { MDXRemote } from 'next-mdx-remote'
import Link from 'next/link'
import stringUtils from '@utils/string.utils'
import { MarkdownParsed } from '@customTypes/MarkdownParsed'

interface MarkdownProps {
  children: MarkdownParsed
}

const isLinkInternal = (link: string): boolean => {
  return link.startsWith('/')
}

const Markdown = ({ children }: MarkdownProps) => {
  return (
    <article className="prose lg:prose-xl">
      <MDXRemote
        {...children}
        components={{
          a: ({ href, ...props }) => {
            if (!href) {
              /* eslint-disable-next-line */
              return <a {...props}></a>
            }

            if (isLinkInternal(href)) {
              return (
                <Link href={href}>
                  {/* eslint-disable-next-line */}
                  <a {...props}></a>
                </Link>
              )
            }

            return (
              /* eslint-disable-next-line */
              <a
                href={stringUtils.parseLink(href)}
                {...props}
                rel="noopener noreferrer"
                target="_blank"
              ></a>
            )
          },
        }}
      />
    </article>
  )
}

export default Markdown
