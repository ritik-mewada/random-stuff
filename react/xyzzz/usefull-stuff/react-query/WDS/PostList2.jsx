import { useQuery } from "react-query";
import { getPosts } from "./api/posts";

export default function PostList2() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (postQuery.status === "loading") return <h1>Loading</h1>;
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Post List 2</h1>
      <ol>
        {postQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}
