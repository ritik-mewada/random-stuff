/* eslint-disable */
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getPosts } from "../../http";
import { useState } from "react";
const queryClient = new QueryClient();
export function Queries() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export function ParallelQueries() {
  // The following queries will execute in parallel
  const userQuery = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  const termsQuery = useQuery({ queryKey: ["terms"], queryFn: fetchUsers });
  const projectQuery = useQuery({
    queryKey: ["projects"],
    queryFn: fetchUsers,
  });
}

export function DynamicParallelQueries() {
  const userQueries = useQueries({
    queries: users.map((user) => {
      return {
        queryKey: ["user", user.id],
        queryFn: () => fetchUserById(user.id),
      };
    }),
  });
}

export function DependentQueries() {
  // Get the User
  const { data: user } = useQuery({
    queryKey: ["user", email], // email will come dynamic or from user input
    queryFn: getUserByEmail,
  });
  const userId = user.id;

  // Then get the user's projects
  const {} = useQuery({
    queryKey: ["projects", userId],
    queryFn: getProjectsByUser,
    // The query will not execute until the userId exists
    enabled: !!userId,
  });
}

// Displaying Global Background Fetching Loading State
export function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();
  return isFetching ? <div>Queries are fetching in background</div> : null;
}

// WINDOW FOCUS REFETCHING
export function windowFocusRefetching() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });
  // DISABLING PER-QUERY
  useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    refetchOnWindowFocus: false,
  });
}

// DISABLING/PAUSING QUERIES
export function disablingORpausingQuery() {
  // `refetch` returned from `useQuery` can be used to manually trigger the query to fetch.
  const { isInitialLoading, isError, data, error, refetch, isFetching } =
    useQuery({
      queryKey: ["todos"],
      queryFn: fetchTodoList,
      enabled: false,
    });
  return <button onClick={() => refetch()}>Fetch Todos</button>;
}
export function lazyQuery() {
  const [filter, setFilter] = useState("");
  const { data } = useQuery({
    queryKey: ["todos", filter],
    queryFn: () => fetchTodos(filter),
    // disabled as long as the filter is empty
    enabled: !!filter,
  });
}

// QUERY RETRIES ( default: 3)
export function queryRetry() {
  const result = useQuery({
    queryKey: ["todos", 1],
    queryFn: fetchTodoListPage,
    retry: 10, // will retry failed requests 10 times before displaying an error
  });
}
// Retry Delay
export function retryDelay() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });
}

// Initial Query Data Load
export function initialDataLoad() {
  const result = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => fetch("/todos"),
    initialData: () => {
      return queryClient.getQueryData(["todos"])?.find((d) => d.id === todoId);
    },
  });
}

// Prefetch Query
export function prefetchQuery() {
  const prefetchTodos = async () => {
    // The results of this query will be cached like a normal query
    await queryClient.prefetchQuery({
      queryKey: ["todos"],
      queryFn: fetchTodos,
    });
  };

  queryClient.setQueryData(["todos"], todos);
}

// QUERY INVALIDATION
export function queryInvalidation() {
  // Invalidate every query in the cache
  queryClient.invalidateQueries();
  // Invalidate every query with a key that starts with `todos`
  queryClient.invalidateQueries({ queryKey: ["todos"] });

  queryClient.invalidateQueries({
    queryKey: ["todos"],
    exact: true,
  });
}
