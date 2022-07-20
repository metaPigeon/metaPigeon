import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import {rehypeMdxCodeMeta} from './components/utils/rehypeMaxCodeMeta'
import remarkSlug from 'remark-slug'
import rehypeSlug from 'rehype-slug'
import { getTableOfContents } from './components/utils/getTableOfContents'

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: { type: 'string', required: true },
    date: {
      type: 'string',
      required: true,
    },
    tags: { type: 'list', of: { type: 'string' } },
    author: { type: 'string' },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    frontMatter: {
      type: 'json',
      resolve: (doc) => ({
        title: doc.title,
        description: doc.description,
        tags: doc.tags,
        author: doc.author,
        slug: `/${doc._raw.flattenedPath}`,
        // editUrl: `${siteConfig.repo.editUrl}/${doc._id}`,
        headings: getTableOfContents(doc.body.raw),
      }),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog],
  mdx: {
    rehypePlugins: [rehypeMdxCodeMeta],
    remarkPlugins: [remarkSlug,remarkGfm, remarkEmoji],
  },
})
