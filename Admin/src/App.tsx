import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState, type JSX } from "react";
import Default from "./components/Default/Default";
import ProjectList from "./components/Projects/ProjectList";
import ProjectDetailsPage from "./components/Projects/ProjectDetailsPage";
import CreateProject from "./components/Projects/CreateProject";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  return !token ? children : <Navigate to="/dashboard" replace />;
}

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handler = () => setAuth(!!localStorage.getItem("token"));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Default />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="projects/create" element={<CreateProject />} />
          {/* Add more nested routes here if needed */}
        </Route>
        {/* Add more private routes here as needed */}
        <Route
          path="*"
          element={<Navigate to={auth ? "/dashboard" : "/"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
