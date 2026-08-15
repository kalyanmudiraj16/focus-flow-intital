import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  BarChart3,
  Settings,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Focus",
    path: "/focus",
    icon: Timer,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const AppShell = () => {
  return (
    <div className="app-shell">

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">F</div>
          <span>FocusFlow</span>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="app-main">

        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AppShell;