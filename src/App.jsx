import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppShell from "./components/layout/AppShell";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Focus from "./pages/Focus";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import "./styles/variables.css";
import "./styles/dashboard.css";
import "./styles/tasks.css";
import "./styles/focus.css";
import "./styles/analytics.css";
import "./styles/settings.css";
import "./styles/responsive.css";

const App = () => {
  return (
    <BrowserRouter>

      {/* BACKGROUND VIDEO */}
      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/focus-bg.mp4"
          type="video/mp4"
        />
      </video>

      {/* DARK OVERLAY */}
      <div className="background-overlay"></div>

      {/* WEBSITE */}
      <div className="app-content">
        <Routes>

          <Route element={<AppShell />}>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/tasks"
              element={<Tasks />}
            />

            <Route
              path="/focus"
              element={<Focus />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Route>

        </Routes>
      </div>

    </BrowserRouter>
  );
};

export default App;