/*eslint-disable*/
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, getPosts } from "../../http";

function Example() {
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    refetchOnWindowFocus: false,
  });
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const mutation = useMutation({
    mutationKey: ["post"],
    mutationFn: createPost,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const optimisticTodo = { id: variables.id, title: variables.title };
      queryClient.setQueryData(["posts"], (old) => [...old, optimisticTodo]);
      return { optimisticTodo };
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData(["posts"], (old) =>
        old.map((todo) =>
          todo.id === context.optimisticTodo.id ? result.data : todo
        )
      );
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["posts"], (old) =>
        old.filter((todo) => todo.id !== context.optimisticTodo.id)
      );
    },
  });

  if (isLoading) return <h4>Loading</h4>;
  if (isError) return <h4>{error.message}</h4>;

  return (
    <>
      <button
        onClick={() =>
          mutation.mutate({ id: Date.now(), title: prompt("Task title:") })
        }
      >
        Create Todo
      </button>
      {data.map((post) => (
        <h4 key={post.id}>
          {post.title}
          <button onClick={() => deleteMutation.mutate(post.id)}>X</button>
        </h4>
      ))}
    </>
  );
}
export default Example;
