import { NavLink } from "react-router-dom";
import { LayoutDashboard, History } from "lucide-react";

function Sidebar() {

    return (

        <aside className="sidebar">
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                }
            >
                <LayoutDashboard size={20} />

                <span>Dashboard</span>

            </NavLink>

            <NavLink
                to="/history"
                className={({ isActive }) =>
                    isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                }
            >
                <History size={20} />

                <span>History</span>

            </NavLink>
        </aside>

    );

}

export default Sidebar;