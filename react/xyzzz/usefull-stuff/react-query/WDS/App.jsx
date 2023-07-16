import React, { useState } from "react";
import PostList1 from "./PostList1";
import PostList2 from "./PostList2";
import Post from "./Post";
import CreatePost from "./CreatePost";
import PostListPaginated from "./PostListPaginated";
import InfiniteScroll from "./InfiniteScroll";
import { useQueryClient } from "react-query";
import { getPost } from "./api/posts";

const App = () => {
  const [currentPage, setCurrentPage] = useState(<PostList1 />);
  const queryClient = useQueryClient();

  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: getPost(1),
    });
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostList1 />)}>Post List 1</button>
      <button onClick={() => setCurrentPage(<PostList2 />)}>Post List 2</button>
      <button
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Page List Paginated
      </button>
      <button onClick={() => setCurrentPage(<InfiniteScroll />)}>
        Post List Infinite
      </button>
      <br />
      {currentPage}
    </div>
  );
};

export default App;
