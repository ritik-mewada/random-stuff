import { useQuery } from "react-query";
import { getPosts } from "./api/posts";

export default function PostList1() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    placeholderData: [{ id: 1, title: "initial data" }],
  });

  if (postQuery.status === "loading") return <h1>Loading</h1>;
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Post List 1</h1>
      <ol>
        {postQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}
