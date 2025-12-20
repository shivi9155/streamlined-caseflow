import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Eye,
  FileEdit,
  MoreVertical,
  Search,
  Filter,
  Calendar,
  User,
  Plus,
  FileText,
  Clock,
  AlertCircle,
  XCircle,
  Scale,
  Home,
  Folder,
  BarChart3,
  Users,
  PieChart,
  Bell,
  UserCircle,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
const Badge = ({ children, color }) => {
  const colors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-blue-100 text-blue-700",
    Scheduled: "bg-green-100 text-green-700",
    "In Progress": "bg-cyan-100 text-cyan-700",
    Pending: "bg-amber-100 text-amber-700",
    Adjourned: "bg-gray-200 text-gray-700",
    Completed: "bg-emerald-100 text-emerald-700"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[color] || "bg-gray-100"}`}>
      {children}
    </span>
  );
};


const Navbar = () => {
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Cases', path: '/cases', icon: Folder },
    { name: 'Schedule', path: '/schedule', icon: Calendar },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Parties', path: '/parties', icon: Users },
    { name: 'Dashboard', path: '/dashboard', icon: PieChart },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <Scale className="h-6 w-6 text-blue-900" />
              </div>
              <span className="text-white text-xl font-bold tracking-wider">DCFM</span>
              <div className="hidden md:block h-6 w-px bg-blue-400 mx-4"></div>
            </div>
            <div className="hidden md:flex items-center ml-8 space-x-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
const CaseManagement = () => {
  const [cases, setCases] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarFilter, setSidebarFilter] = useState("all");
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);

  // UPDATED: Form state now includes 'status'
  const [formData, setFormData] = useState({
    title: "",
    category: "CMI",
    priority: "Medium",
    status: "Pending", 
    plaintiff: "",
    defendant: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/cases")
      .then(res => res.json())
      .then(data => setCases(data))
      .catch(err => console.error("Error loading cases:", err));
  }, []);

  const handleCreateNewCase = async () => {
    if (!formData.title || !formData.plaintiff || !formData.defendant) {
      alert("Please fill in Case Title, Plaintiff, and Defendant.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cases/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedCase = await response.json();
        setCases([savedCase, ...cases]); 
        setIsNewCaseModalOpen(false); 
        setFormData({ title: "", category: "CMI", priority: "Medium", status: "Pending", plaintiff: "", defendant: "" }); 
      } else {
        alert("Failed to save to database");
      }
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (sidebarFilter === "high" && c.priority !== "High") return false;
      if (sidebarFilter === "medium" && c.priority !== "Medium") return false;
      if (sidebarFilter === "low" && c.priority !== "Low") return false;
      if (sidebarFilter === "workable" && c.status !== "In Progress") return false;
      if (sidebarFilter === "archived" && c.status !== "Adjourned") return false;
      if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [cases, sidebarFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-8 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* SIDEBAR WITH UPDATED COUNTS */}
          <aside className="w-64 bg-white rounded-2xl shadow-lg p-4 h-fit sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Cases</h3>
              <div className="text-xl font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{cases.length}</div>
            </div>
            
            <div className="space-y-2">
              <button onClick={() => setSidebarFilter("all")} className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 ${sidebarFilter === "all" ? "bg-blue-600 text-white shadow-lg" : "hover:bg-gray-50 border border-gray-200"}`}>
                📂 <span className="font-medium">All Cases</span>
              </button>

              <button onClick={() => setIsNewCaseModalOpen(true)} className="w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all hover:bg-emerald-50 border border-emerald-200">
                <Plus className="h-4 w-4 text-emerald-600" /> <span className="font-medium text-emerald-700">New Case</span>
              </button>

              {/* High Priority */}
              <button onClick={() => setSidebarFilter("high")} className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 ${sidebarFilter === "high" ? "bg-red-600 text-white shadow-lg" : "hover:bg-red-50 border border-red-200"}`}>
                🔥 <span className="font-medium">High Priority</span>
                <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                   {cases.filter(c => c.priority === "High").length}
                </span>
              </button>

              {/* Medium Priority */}
              <button onClick={() => setSidebarFilter("medium")} className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 ${sidebarFilter === "medium" ? "bg-yellow-500 text-white shadow-lg" : "hover:bg-yellow-50 border border-yellow-200"}`}>
                ⚠️ <span className="font-medium">Medium Priority</span>
                <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                   {cases.filter(c => c.priority === "Medium").length}
                </span>
              </button>

              {/* Low Priority */}
              <button onClick={() => setSidebarFilter("low")} className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 ${sidebarFilter === "low" ? "bg-blue-500 text-white shadow-lg" : "hover:bg-blue-50 border border-blue-200"}`}>
                💧 <span className="font-medium">Low Priority</span>
                <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                   {cases.filter(c => c.priority === "Low").length}
                </span>
              </button>
            </div>
          </aside>

          {/* MAIN TABLE */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Case Management</h1>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none" />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Case Details</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Priority</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((c) => (
                    <tr key={c._id || c.id} className="border-b hover:bg-gray-50/50">
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-lg bg-blue-50"><FileText className="h-5 w-5 text-blue-500" /></div>
                          <div>
                            <div className="font-bold text-blue-600">{c.caseNumber}</div>
                            <div className="font-semibold text-gray-900">{c.title}</div>
                            <div className="text-sm text-gray-500">{c.plaintiff} vs {c.defendant}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6"><Badge color={c.priority}>{c.priority}</Badge></td>
                      <td className="py-4 px-6"><Badge color={c.status}>{c.status}</Badge></td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"><Eye className="h-5 w-5" /></button>
                          <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600"><FileEdit className="h-5 w-5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* NEW CASE MODAL WITH STATUS SELECTION */}
      {isNewCaseModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Case</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Case Title</label>
                <input type="text" placeholder="Case Title" className="w-full p-2 border rounded" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                  <select className="w-full p-2 border rounded" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="CMI">CMI</option><option value="Criminal">Criminal</option><option value="Family">Family</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Priority</label>
                  <select className="w-full p-2 border rounded" value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                    <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* NEW STATUS SELECTION FIELD */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Case Status</label>
                <select 
                  className="w-full p-2 border rounded bg-white" 
                  value={formData.status} 
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">Ongoing</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Adjourned">Adjourned</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Plaintiff" className="w-full p-2 border rounded" value={formData.plaintiff} onChange={(e) => setFormData({...formData, plaintiff: e.target.value})} />
                <input type="text" placeholder="Defendant" className="w-full p-2 border rounded" value={formData.defendant} onChange={(e) => setFormData({...formData, defendant: e.target.value})} />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setIsNewCaseModalOpen(false)} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
                <button onClick={handleCreateNewCase} className="px-4 py-2 bg-blue-600 text-white rounded font-bold shadow-lg hover:bg-blue-700">Create Case</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseManagement;