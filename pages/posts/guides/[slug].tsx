import Head from "next/head";
// import { format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'

export async function getStaticPaths() {
  const paths: string[] = allPosts.map((post) => post.url);
  console.log(allPosts, 'kskjfklaj')
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }:any) {
  console.log(allPosts, 'kkkkkkkkkk')
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === params.slug
  );
  return {
    props: {
      post,
    },
  };
}

const MyButton: React.FC = () => <button>Click me</button>

const PostLayout = ({ post }: { post: Post }) => {
  const MDXContent = useMDXComponent(post.body.code)
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-xl mx-auto py-8">
        <div className="text-center mb-8">
          <time dateTime={post.date} className="text-xs text-gray-600 mb-1">
            {/* {format(parseISO(post.date), "LLLL d, yyyy")} */}
          </time>
          <h1>{post.title}</h1>
        </div>
        <MDXContent />
        {/* <div dangerouslySetInnerHTML={{ __html: post.body.html }} /> */}
      </article>
    </>
  );
};

export default PostLayout;
