import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              {/* All Routes that can be accessable by anyone */}
            </GuestRoute>
          }
        />
        {/* guest route */}
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              {/* You can Register Login or Register routes here */}
            </GuestRoute>
          }
        />
        {/* semi protected route */}
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              {/* If user is registed by not activated */}
            </SemiProtectedRoute>
          }
        />
        {/* protected routes */}
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              {/* Only logged in users can access this */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/:id"
          element={
            <ProtectedRoute>
              {/* Only logged in users can access this */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children }) => {
  const location = useLocation(); // for current state path
  const isAuth = false;

  return isAuth ? (
    <Navigate
      to={{
        pathname: "/rooms",
        state: { from: location.pathname },
      }}
    />
  ) : (
    children
  );
};

const SemiProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth, user } = useSelector((state) => state.auth);

  return !isAuth ? (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  ) : isAuth && !user.activated ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/rooms",
        state: { from: location },
      }}
    />
  );
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth, user } = useSelector((state) => state.auth);

  return !isAuth ? (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  ) : isAuth && !user?.activated ? (
    <Navigate
      to={{
        pathname: "/activate",
        state: { from: location },
      }}
    />
  ) : (
    children
  );
};

export default App;
