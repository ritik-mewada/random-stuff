import * as React from "react";

function BasicFetching() {
  const [status, setStatus] = React.useState("idle");
  const [data, setData] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState(false);

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  React.useEffect(() => {
    if (!queried) {
      return;
    }
    setStatus("loading");
    window
      .fetch(`url/books?query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((resData) => {
        setData(resData);
        setStatus("success");
      });
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

export { BasicFetching };
