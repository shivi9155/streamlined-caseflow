import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Eye,
  FileEdit,
  Search,
  Plus,
  FileText,
  Scale,
  Home,
  Folder,
  BarChart3,
  Users,
  PieChart,
  Trash2,
  X,
  Calendar,
  AlertCircle
} from "lucide-react";

/* ---------------- BADGE ---------------- */
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

/* ---------------- NAVBAR ---------------- */
const Navbar = () => {
  const location = useLocation();
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
              <div className="bg-white p-2 rounded-lg"><Scale className="h-6 w-6 text-blue-900" /></div>
              <span className="text-white text-xl font-bold tracking-wider">DCFM</span>
            </div>
            <div className="hidden md:flex items-center ml-8 space-x-4">
              {navigationItems.map((item) => (
                <Link key={item.name} to={item.path} className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${location.pathname === item.path ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700/50'}`}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "", category: "CMI", priority: "Medium", status: "Pending", plaintiff: "", defendant: ""
  });

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = () => {
    fetch("http://localhost:5000/api/cases")
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setCases(data); })
      .catch(err => console.error("Load error:", err));
  };

  const handleSaveCase = async () => {
    if (!formData.title || !formData.plaintiff || !formData.defendant) {
      alert("Please fill in required fields.");
      return;
    }

    const url = isEditing 
      ? `http://localhost:5000/api/cases/${currentEditId}` 
      : 'http://localhost:5000/api/cases/create';
    
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (isEditing) {
          // Find the case by ID and update it in the UI list
          setCases(prev => prev.map(c => c._id === currentEditId ? result : c));
        } else {
          setCases(prev => [result, ...prev]);
        }
        closeModal();
      } else {
        alert("Failed to save case. Check server logs.");
      }
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  const handleDeleteCase = async (id) => {
    if (!window.confirm("Permanently delete this case from the database?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/cases/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCases(cases.filter(c => c._id !== id));
      }
    } catch (err) { console.error(err); }
  };

  const openEditModal = (c) => {
    setIsEditing(true);
    setCurrentEditId(c._id);
    setFormData({ 
      title: c.title, 
      category: c.category, 
      priority: c.priority, 
      status: c.status, 
      plaintiff: c.plaintiff, 
      defendant: c.defendant 
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentEditId(null);
    setFormData({ title: "", category: "CMI", priority: "Medium", status: "Pending", plaintiff: "", defendant: "" });
  };

  // Restored Priority Counts for Sidebar
  const counts = useMemo(() => ({
    all: cases.length,
    high: cases.filter(c => c.priority === "High").length,
    medium: cases.filter(c => c.priority === "Medium").length,
    low: cases.filter(c => c.priority === "Low").length
  }), [cases]);

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (sidebarFilter !== "all" && c.priority.toLowerCase() !== sidebarFilter) return false;
      if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [cases, sidebarFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-8 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR WITH PRIORITY COUNTS */}
          <aside className="w-full lg:w-72 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Navigation</h3>
              <div className="space-y-2">
                <button onClick={() => setSidebarFilter("all")} className={`w-full px-4 py-3 rounded-xl text-left flex items-center justify-between transition-all ${sidebarFilter === "all" ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-50 text-gray-700"}`}>
                  <div className="flex items-center gap-3"><Folder size={18}/> <span>All Cases</span></div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sidebarFilter === "all" ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-500"}`}>{counts.all}</span>
                </button>
                <button onClick={() => { setIsEditing(false); setIsModalOpen(true); }} className="w-full px-4 py-3 rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-3 shadow-lg hover:bg-emerald-700 transition">
                  <Plus size={20}/> New Case Registry
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Priority Filters</h3>
              <div className="space-y-2">
                {[
                  { id: 'high', label: 'High Priority', color: 'text-red-600', bg: 'bg-red-50', count: counts.high },
                  { id: 'medium', label: 'Medium Priority', color: 'text-amber-600', bg: 'bg-amber-50', count: counts.medium },
                  { id: 'low', label: 'Low Priority', color: 'text-blue-600', bg: 'bg-blue-50', count: counts.low }
                ].map((p) => (
                  <button key={p.id} onClick={() => setSidebarFilter(p.id)} className={`w-full px-4 py-3 rounded-xl text-left flex items-center justify-between transition-all ${sidebarFilter === p.id ? 'ring-2 ring-offset-1 ring-blue-500 bg-white shadow-sm' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3"><AlertCircle className={`h-4 w-4 ${p.color}`}/> <span className="font-medium text-gray-700">{p.label}</span></div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.bg} ${p.color}`}>{p.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 space-y-6">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input type="text" placeholder="Search case or parties..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-6 py-5 bg-white border border-gray-200 rounded-3xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-lg" />
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="text-left p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Case Information</th>
                    <th className="text-left p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status & Priority</th>
                    <th className="text-center p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredCases.map((c) => (
                    <tr key={c._id} className="hover:bg-blue-50/20 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 p-3 bg-blue-50 rounded-2xl group-hover:bg-white transition-colors"><FileText className="h-6 w-6 text-blue-600" /></div>
                          <div>
                            <div className="text-xs font-black text-blue-600 mb-1">{c.caseNumber}</div>
                            <div className="text-xl font-bold text-gray-900 mb-1">{c.title}</div>
                            <div className="text-sm text-gray-500 font-medium">
                              <span className="text-blue-800">{c.plaintiff}</span> vs <span className="text-purple-800">{c.defendant}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-2">
                          <Badge color={c.priority}>{c.priority} Priority</Badge>
                          <Badge color={c.status}>{c.status}</Badge>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => openEditModal(c)} className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all" title="Edit Case"><FileEdit size={22}/></button>
                          <button onClick={() => handleDeleteCase(c._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all" title="Delete Case"><Trash2 size={22}/></button>
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

      {/* MODAL - REGISTER / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[40px] w-full max-w-xl p-10 relative shadow-2xl">
            <h2 className="text-3xl font-black text-gray-900 mb-2">{isEditing ? "Modify Case" : "Register Case"}</h2>
            <p className="text-gray-500 mb-8 font-medium">Please provide the details below.</p>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Case Title</label>
                <input placeholder="Enter title..." className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:border-blue-500 outline-none font-bold" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">Category</label>
                  <select className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:border-blue-500 outline-none font-bold" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="CMI">Civil (CMI)</option><option value="Criminal">Criminal</option><option value="Family">Family</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">Priority</label>
                  <select className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:border-blue-500 outline-none font-bold" value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                    <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Current Status</label>
                <select className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:border-blue-500 outline-none font-bold" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option value="Pending">Pending</option><option value="In Progress">Ongoing</option><option value="Scheduled">Scheduled</option><option value="Completed">Completed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Petitioner" className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 font-bold" value={formData.plaintiff} onChange={(e) => setFormData({...formData, plaintiff: e.target.value})} />
                <input placeholder="Respondent" className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 font-bold" value={formData.defendant} onChange={(e) => setFormData({...formData, defendant: e.target.value})} />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button onClick={closeModal} className="flex-1 py-4 border-2 border-gray-100 text-gray-400 rounded-2xl font-black hover:bg-gray-50 uppercase text-sm">Cancel</button>
                <button onClick={handleSaveCase} className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg hover:bg-blue-700 uppercase text-sm">
                  {isEditing ? "Save Changes" : "Confirm Entry"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseManagement;