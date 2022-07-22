import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import {rehypeMdxCodeMeta} from './components/utils/rehypeMaxCodeMeta'
import rehypeSlug from 'rehype-slug'
import { getTableOfContents } from './components/utils/getTableOfContents'
import { resolve } from 'path'

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
    img: {type: 'string'}
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    img: {
      type: 'string',
      resolve: (doc) => {
        if(doc.img === 'public') {
          return `/${doc._raw.flattenedPath}.png`
        } else if(doc.img) {
          return doc.img
        } else {
          return 'https://rmt.dogedoge.com/fetch/fluid/storage/hello-fluid/cover.png?w=480&fmt=webp'
        }
      }
    },
    date: {
      type: 'string',
      resolve: (doc) => new Date(doc.date).toISOString().slice(0,10)
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
        img: `/${doc._raw.flattenedPath}.png`
      }),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog],
  mdx: {
    rehypePlugins: [rehypeMdxCodeMeta, rehypeSlug],
    remarkPlugins: [remarkGfm, remarkEmoji],
  },
})
