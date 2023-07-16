import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SingleHero } from "./components/SingleHero";
import { ParallalQueries } from "./components/ParallalQueries";
import { DynamicParallelQueries } from "./components/DynamicParallalQueries";
import { DepandentQueries } from "./components/DepandentQueries";
import { PaginatedQueriesPage } from "./components/PaginatedQueries";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/rq-paginated">
              <PaginatedQueriesPage />
            </Route>
            <Route path="/rq-depandent-queries">
              <DepandentQueries email="viswas@gmail.com" />
            </Route>
            <Route path="/rq-dynamic-parallel">
              <DynamicParallelQueries heroIds={[1, 3]} />
            </Route>
            <Route path="/rq-parallel">
              <ParallalQueries />
            </Route>
            <Route path="/super-heroes/:heroId">
              <SingleHero />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
