/*
 * PUT QUERY MUTATION
 * HOW TO UPDATE LIST DATA ON UPDATE MUTATE
 * HOW TO RETIVE THE OLD DATA ON ERROR UPDATING
 * HOW TO INVALIDATE QUERY ON SETTLED
 */

import { useMutation, useQuery, useQueryClient } from "react-query";
const queryClient = useQueryClient();

// EXAMPLE: 1 START
const setAssignment = useMutation(
  (assignee) => {
    return fetch(`/api/issues/${issueNumber}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ assignee }),
    }).then((res) => res.json());
  },
  {
    onMutate: (assignee) => {
      const oldAssignee = queryClient.getQueryData([
        "issues",
        issueNumber,
      ]).assignee;
      queryClient.setQueryData(["issues", issueNumber], (data) => ({
        ...data,
        assignee,
      }));

      return function rollback() {
        queryClient.setQueryData(["issues", issueNumber], (data) => ({
          ...data,
          assignee: oldAssignee,
        }));
      };
    },
    onError: (error, variables, rollback) => {
      rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["issues", issueNumber], { exact: true });
    },
  }
);
// EXAMPLE: 1 END

// *************************************************************************

// EXAMPLE: 2 START
const setLabels = useMutation(
  (labelId) => {
    const newLabels = labels.includes(labelId)
      ? labels.filter((currentLabel) => currentLabel !== labelId)
      : [...labels, labelId];
    return fetch(`/api/issues/${issueNumber}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ labels: newLabels }),
    }).then((res) => res.json());
  },
  {
    onMutate: (labelId) => {
      const oldLabels = queryClient.getQueryData([
        "issues",
        issueNumber,
      ]).labels;
      const newLabels = oldLabels.includes(labelId)
        ? oldLabels.filter((label) => label !== labelId)
        : [...oldLabels, labelId];

      queryClient.setQueryData(["issues", issueNumber], (data) => ({
        ...data,
        labels: newLabels,
      }));
      return function rollback() {
        queryClient.setQueryData(["issues", issueNumber], (data) => {
          const rollbackLabels = oldLabels.includes(labelId)
            ? [...data.labels, labelId]
            : data.labels.filter((label) => label !== labelId);
          return {
            ...data,
            labels: rollbackLabels,
          };
        });
      };
    },
    onError: (error, variables, rollback) => {
      rollback();
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(["issues", issueNumber], { exact: true });
    },
  }
);
// EXAMPLE: 2 END

// *************************************************************************

// EXAMPLE: 3 START
const setStatus = useMutation(
  (status) => {
    return fetch(`/api/issues/${issueNumber}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    }).then((res) => res.json());
  },
  {
    onMutate: (status) => {
      const oldStatus = queryClient.getQueryData([
        "issues",
        issueNumber,
      ]).status;
      queryClient.setQueryData(["issues", issueNumber], (data) => ({
        ...data,
        status,
      }));

      return function rollback() {
        queryClient.setQueryData(["issues", issueNumber], (data) => ({
          ...data,
          status: oldStatus,
        }));
      };
    },
    onError: (error, variables, rollback) => {
      rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["issues", issueNumber], { exact: true });
    },
  }
);
// EXAMPLE: 3 END
