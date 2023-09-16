/**
 * SEARCH QUERY
 */
const searchQuery = useQuery(
  ["issues", "search", searchValue],
  ({ signal }) =>
    fetch(`/api/search/issues?q=${searchValue}`, { signal }).then((res) =>
      res.json()
    ),
  {
    enabled: searchValue.length > 0,
  }
);

/**
 * QUERY FOR FETCH LISTING
 * SET THE QUERY DATA FOR SINGLE ITEM AFTER FETCHING THE LIST
 */
const issuesQuery = useQuery(
  ["issues", { labels, status, pageNum }],
  async ({ signal }) => {
    const statusString = status ? `&status=${status}` : "";
    const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
    const paginationString = pageNum ? `&page=${pageNum}` : "";

    const results = await fetchWithError(
      `/api/issues?${labelsString}${statusString}${paginationString}`,
      {
        signal,
      }
    );

    results.forEach((issue) => {
      queryClient.setQueryData(["issues", issue.number.toString()], issue);
    });

    return results;
  },
  {
    keepPreviousData: true,
  }
);
