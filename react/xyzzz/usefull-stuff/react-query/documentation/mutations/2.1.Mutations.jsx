/*eslint-disable*/
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../http";

function Mutation() {
  const mutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: createPost,
  });

  const handleCreateTask = (title) => {
    mutation.mutate({ title, completed: false });
  };

  // This will not work in React 16 and earlier
  const CreateTodos = () => {
    const mutation = useMutation({
      mutationFn: (event) => {
        event.preventDefault();
        return fetch("/api", new FormData(event.target));
      },
    });

    return <form onSubmit={mutation.mutate}>...</form>;
  };

  // This will work
  const CreateTodo = () => {
    const mutation = useMutation({
      mutationFn: (formData) => {
        return fetch("/api", formData);
      },
    });
    const onSubmit = (event) => {
      event.preventDefault();
      mutation.mutate(new FormData(event.target));
    };

    return <form onSubmit={onSubmit}>...</form>;
  };
}

// CHECKOUT ./MUTATEEXAMPLE FOR CACHE THE UPDATED.

// INVALIDATION FOR MUTATION
export function mutationInvalidation() {
  const queryClient = useQueryClient();
  // When this mutation succeeds, invalidate any queries with the `todos` or `reminders` query key
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });
}

// update from mutation response
export function updateFromMutationResponse() {
  const queryClient = useQueryClient();
  // direct way
  const mutation = useMutation({
    mutationFn: editTodo,
    onSuccess: (data) => {
      queryClient.setQueryData(["todo", { id: 5 }, data]);
    },
  });
  // immutability
  queryClient.setQueryData(["posts", { id }], (oldData) =>
    oldData
      ? {
          ...oldData,
          title: "my new post title",
        }
      : oldData
  );

  mutation.mutate({
    id: 5,
    name: "Do the laundry",
  });
  const { status, data, error } = useQuery({
    queryKey: ["todo", { id: 5 }],
    queryFn: fetchTodoById,
  });
}
// reusable mutation
const useMutationTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTodo,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["todo", { id: variables.id }, data]);
    },
  });
};

// OPTIMISTIC UPDATES
export function optimisticUpdates() {
  const queryClient = useQueryClient();
  useMutation({
    mutationFn: updateTodo,
    // when mutation is created
    onMutate: async (newTodo) => {
      // cancle all the outgoing refetches
      // so they won't overwrite our optimistic updates
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // snapshot the previous values
      const previousTodos = queryClient.getQueryData(["todos"]);

      // optimistically update to the new value
      queryClient.setQueryData(["todos"], (old) => [...old, newTodo]);

      // return context object with snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (error, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    // always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
// updating the single todo
export function optimisticUpdatesOfSingleTodo() {
  const queryClient = useQueryClient();
  useMutation({
    mutationFn: updateTodo,
    // when mutation is called
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos", newTodo.id] });

      const previousTodo = queryClient.getQueryData(["todos", newTodo.id]);

      queryClient.setQueryData(["todos", newTodo.id], newTodo);

      return { previousTodo, newTodo };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["todos", context.newTodo.id],
        context.previousTodo
      );
    },
    // Always refetch after error or success:
    onSettled: (newTodo) => {
      queryClient.invalidateQueries({ queryKey: ["todos", newTodo.id] });
    },
  });
}
