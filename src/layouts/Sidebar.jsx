import {
  LayoutDashboard,
  FileText,
  Calendar,
  BarChart2,
  Users,
  Settings
} from "lucide-react";

const Sidebar = ({ active }) => {
  const linkClass = (name) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
     ${active === name
        ? "bg-emerald-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
      }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-xl font-bold mb-8 flex items-center gap-2">
        ⚖️ DCFM
      </h1>

      <nav className="space-y-2">
        <div className={linkClass("Dashboard")}><LayoutDashboard size={18}/>Dashboard</div>
        <div className={linkClass("Cases")}><FileText size={18}/>Cases</div>
        <div className={linkClass("Schedule")}><Calendar size={18}/>Schedule</div>
        <div className={linkClass("Analytics")}><BarChart2 size={18}/>Analytics</div>
        <div className={linkClass("Parties")}><Users size={18}/>Parties</div>
        <div className={linkClass("Settings")}><Settings size={18}/>Settings</div>
      </nav>
    </aside>
  );
};

export default Sidebar;
