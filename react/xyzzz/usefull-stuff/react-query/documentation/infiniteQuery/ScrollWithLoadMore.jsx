import { Fragment } from "react";

import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
const limit = 100;

const fetchComments = ({ pageParam = 1 }) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/comments?_page=${pageParam}&_limit=${limit}`
  );
};

export const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchComments, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.length === limit) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  // why I map double because data.pages will be array of axios response
  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id} {color.name}
                </h2>
              ))}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
