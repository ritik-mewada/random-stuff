import * as React from "react";
import { client } from "./utils/api-client";
import { useAsync } from "./utils/useAsync";

function AdvanceFetching() {
  const { data, error, run, isLoading, isError, isSuccess } = useAsync();
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState(false);

  React.useEffect(() => {
    if (!queried) return;
    run(client(`books?query=${encodeURIComponent(query)}`));
  }, [query, queried, run]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    setQueried(true);
    setQuery(event.target.elements.search.value);
  }

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          placeholder="Search books..."
          id="search"
          css={{ width: "100%" }}
        />
      </form>
    </div>
  );
}

export { AdvanceFetching };
