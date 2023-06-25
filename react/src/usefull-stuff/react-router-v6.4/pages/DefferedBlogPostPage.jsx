import { useLoaderData, defer, Await } from "react-router-dom";
import Posts from "../components/Posts";
import { getSlowPosts } from "../util/api";
import { Suspense } from "react";

function DefferedBlogPostPage() {
  const loaderData = useLoaderData();
  return (
    <>
      <h1>Our Blog Posts</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={loaderData.posts}
          errorElement={<p>error loading blog posts</p>}
        >
          {(loadedPosts) => <Posts blogPosts={loadedPosts} />}
        </Await>
      </Suspense>
    </>
  );
}

export default DefferedBlogPostPage;

export async function loader() {
  return defer({ posts: getSlowPosts() });
}
