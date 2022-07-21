import { allBlogs } from 'contentlayer/generated'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from 'components/mdx-components'
import BlogItemLayout from 'components/layout/components/blogItem'
// import { getMember } from 'utils/get-all-members'
console.log(allBlogs)
export default function Page({
  blog,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(allBlogs)
  const Component = useMDXComponent(blog!.body.code)
  return (
    <BlogItemLayout frontMatter={blog!.frontMatter}>
        <Component components={MDXComponents} />
    </BlogItemLayout>
      
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = allBlogs
    .map((t) =>
      t._id.replace('blog/', '').replace('.mdx', '').replace('index', ''),
    )
    .map((id) => ({ params: { slug: [id.replace('blog/', '')] } }))

  return { paths: blogs, fallback: false }
}

export const getStaticProps = async (ctx:any) => {
  const params = Array.isArray(ctx.params.slug)
    ? ctx.params.slug
    : [ctx.params.slug]
  const blog = allBlogs.find((blog) => blog._id.includes(params.join('/')))
  // const authorData = getMember(blog!.frontMatter.author)
  // blog!.frontMatter.authorData = authorData

  return { props: { blog } }
}
