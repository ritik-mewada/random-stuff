/* eslint-disable */
import "./App.css";
import QuickStart from "./components/1.QuickStart";
// import QuickStart from "./components/1.QuickStart";
// import PaginatedQuery from "./components/3.PaginatedQuery";
import { InfiniteQueriesPage } from "./components/4.InfiniteQuery";
import MutationExample from "./components/MutateExample";
import Index from "./infiniteQuery/index";

function App() {
  return (
    <>
      <h1>React Query</h1>
      {/* <QuickStart /> */}
      {/* <PaginatedQuery /> */}
      {/* <InfiniteQueriesPage /> */}
      {/* <MutationExample /> */}
      <Index />
    </>
  );
}

export default App;
