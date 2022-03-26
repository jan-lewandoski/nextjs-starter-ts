import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type MarkdownParsed = MDXRemoteSerializeResult<Record<string, unknown>>
