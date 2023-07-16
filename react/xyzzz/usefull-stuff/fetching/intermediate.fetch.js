import * as React from "react";
import { client } from "./utils/api-client";

function IntermediateFetching() {
  const [status, setStatus] = React.useState("idle");
  const [data, setData] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState(false);
  const [error, setError] = React.useState(null);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  React.useEffect(() => {
    if (!queried) {
      return;
    }
    setStatus("loading");
    client(`books?query=${encodeURIComponent(query)}`).then(
      (resData) => {
        setData(resData);
        setStatus("success");
      },
      (errorData) => {
        setError(errorData);
        setStatus("error");
      }
    );
  }, [query, queried]);

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

export { IntermediateFetching };
