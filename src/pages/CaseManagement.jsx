import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
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
  Scale
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const initialMockCases = [
  {
    id: "1",
    caseNumber: "CTV/2024/001234",
    title: "Smith vs. Johnson Property Dispute",
    category: "CMI",
    priority: "High",
    status: "Scheduled",
    nextHearing: "15 Dec 2024",
    filedDate: "2024-01-15",
    plaintiff: "Robert Smith",
    defendant: "Johnson Property Group"
  },
  {
    id: "2",
    caseNumber: "CRV/2024/000892",
    title: "State vs. Anil Kumar",
    category: "Criminal",
    priority: "High",
    status: "In Progress",
    nextHearing: "12 Dec 2024",
    filedDate: "2024-02-20",
    plaintiff: "State",
    defendant: "Anil Kumar"
  },
  {
    id: "3",
    caseNumber: "FAW/2024/002156",
    title: "Priya Sharma vs. Rajesh Sharma",
    category: "Family",
    priority: "Medium",
    status: "Pending",
    nextHearing: null,
    filedDate: "2024-03-10",
    plaintiff: "Priya Sharma",
    defendant: "Rajesh Sharma"
  },
  {
    id: "4",
    caseNumber: "TCM/2024/000567",
    title: "Tech Solutions Inc. vs. Global Systems",
    category: "Commercial",
    priority: "Medium",
    status: "Scheduled",
    nextHearing: "18 Dec 2024",
    filedDate: "2024-04-05",
    plaintiff: "Tech Solutions Inc.",
    defendant: "Global Systems Ltd"
  },
  {
    id: "5",
    caseNumber: "CTV/2024/003421",
    title: "Municipal Corp. vs. Residents Welfare",
    category: "CMI",
    priority: "Low",
    status: "Adjourned",
    nextHearing: "10 Jan 2025",
    filedDate: "2024-05-22",
    plaintiff: "Municipal Corporation",
    defendant: "Residents Welfare Association"
  },
  {
    id: "6",
    caseNumber: "CIV/2024/001111",
    title: "Patel vs. Insurance Co.",
    category: "Civil",
    priority: "Medium",
    status: "In Progress",
    nextHearing: "20 Dec 2024",
    filedDate: "2024-06-10",
    plaintiff: "Amit Patel",
    defendant: "Insurance Co."
  }
];

/* ---------------- BADGE ---------------- */
const Badge = ({ children, color }) => {
  const colors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-blue-100 text-blue-700",
    Scheduled: "bg-green-100 text-green-700",
    "In Progress": "bg-cyan-100 text-cyan-700",
    Pending: "bg-amber-100 text-amber-700",
    Adjourned: "bg-gray-200 text-gray-700"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[color]}`}>
      {children}
    </span>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
const CaseManagement = () => {
  const [cases, setCases] = useState(initialMockCases);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarFilter, setSidebarFilter] = useState("all");
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  
  // Since this is the Cases page, we set cases as active
  const [activeNav, setActiveNav] = useState("cases");

  /* ---------------- UPDATED FILTER LOGIC ---------------- */
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      // Priority filters
      if (sidebarFilter === "high" && c.priority !== "High") return false;
      if (sidebarFilter === "medium" && c.priority !== "Medium") return false;
      if (sidebarFilter === "low" && c.priority !== "Low") return false;
      
      // Other filters
      if (sidebarFilter === "workable" && c.status !== "In Progress") return false;
      if (sidebarFilter === "archived" && c.status !== "Adjourned") return false;

      // Search filter
      if (
        searchQuery &&
        !c.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;

      return true;
    });
  }, [cases, sidebarFilter, searchQuery]);

  // Function to handle new case creation
  const handleCreateNewCase = () => {
    // Generate a new case number
    const prefixes = {
      'CMI': 'CTV',
      'Criminal': 'CRV',
      'Family': 'FAW',
      'Commercial': 'TCM',
      'Civil': 'CIV'
    };
    
    const category = 'CMI'; // Default category
    const prefix = prefixes[category] || 'CAS';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    
    const newCase = {
      id: (cases.length + 1).toString(),
      caseNumber: `${prefix}/${year}/${randomNum}`,
      title: "New Case",
      category: category,
      priority: "Medium",
      status: "Pending",
      nextHearing: null,
      filedDate: new Date().toISOString().split('T')[0],
      plaintiff: "New Plaintiff",
      defendant: "New Defendant"
    };
    
    setCases([newCase, ...cases]);
    setIsNewCaseModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200">
                <Scale className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-700">DCFM</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`font-medium transition-colors pb-1 ${
                  activeNav === "home" 
                    ? "text-blue-700 font-semibold border-b-2 border-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setActiveNav("home")}
              >
                Home
              </Link>
              <Link 
                to="/cases" 
                className={`font-medium transition-colors pb-1 ${
                  activeNav === "cases" 
                    ? "text-blue-700 font-semibold border-b-2 border-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setActiveNav("cases")}
              >
                Cases
              </Link>
              <a 
                href="SchedulePage" 
                className={`font-medium transition-colors pb-1 ${
                  activeNav === "schedule" 
                    ? "text-blue-700 font-semibold border-b-2 border-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setActiveNav("schedule")}
              >
                Schedule
              </a>
              <a 
                href="/analytics" 
                className={`font-medium transition-colors pb-1 ${
                  activeNav === "analytics" 
                    ? "text-blue-700 font-semibold border-b-2 border-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setActiveNav("analytics")}
              >
                Analytics
              </a>
              <a 
                href="/parties" 
                className={`font-medium transition-colors pb-1 ${
                  activeNav === "parties" 
                    ? "text-blue-700 font-semibold border-b-2 border-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setActiveNav("parties")}
              >
                Parties
              </a>
              <a 
                href="#" 
                className={`font-medium transition-colors pb-1 ${
                  activeNav === "dashboard" 
                    ? "text-blue-700 font-semibold border-b-2 border-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setActiveNav("dashboard")}
              >
                Dashboard
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* ---------------- SIDEBAR ---------------- */}
          <aside className="w-64 bg-white rounded-2xl shadow-lg p-4 h-fit sticky top-28">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Cases</h3>
              <div className="text-xl font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                {cases.length}
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setSidebarFilter("all")}
                className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                  sidebarFilter === "all"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${sidebarFilter === "all" ? "bg-white/20" : "bg-blue-100"}`}>
                  📂
                </div>
                <span className="font-medium">All Cases</span>
              </button>

              <button
                onClick={() => setIsNewCaseModalOpen(true)}
                className="w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300"
              >
                <div className="p-1.5 bg-emerald-100 rounded-lg">
                  ➕
                </div>
                <span className="font-medium text-emerald-700">New Case</span>
              </button>

              {/* Priority Filters */}
              <button
                onClick={() => setSidebarFilter("high")}
                className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                  sidebarFilter === "high"
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                    : "hover:bg-red-50 border border-red-200"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${sidebarFilter === "high" ? "bg-white/20" : "bg-red-100"}`}>
                  🔥
                </div>
                <span className="font-medium">High Priority</span>
                <span className="ml-auto text-xs bg-white/30 px-2 py-1 rounded">
                  {cases.filter(c => c.priority === "High").length}
                </span>
              </button>

              <button
                onClick={() => setSidebarFilter("medium")}
                className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                  sidebarFilter === "medium"
                    ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg"
                    : "hover:bg-yellow-50 border border-yellow-200"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${sidebarFilter === "medium" ? "bg-white/20" : "bg-yellow-100"}`}>
                  ⚠️
                </div>
                <span className="font-medium">Medium Priority</span>
                <span className="ml-auto text-xs bg-white/30 px-2 py-1 rounded">
                  {cases.filter(c => c.priority === "Medium").length}
                </span>
              </button>

              <button
                onClick={() => setSidebarFilter("low")}
                className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                  sidebarFilter === "low"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "hover:bg-blue-50 border border-blue-200"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${sidebarFilter === "low" ? "bg-white/20" : "bg-blue-100"}`}>
                  💧
                </div>
                <span className="font-medium">Low Priority</span>
                <span className="ml-auto text-xs bg-white/30 px-2 py-1 rounded">
                  {cases.filter(c => c.priority === "Low").length}
                </span>
              </button>

              {/* Other Filters */}
              <button
                onClick={() => setSidebarFilter("workable")}
                className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                  sidebarFilter === "workable"
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg"
                    : "hover:bg-emerald-50 border border-emerald-200"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${sidebarFilter === "workable" ? "bg-white/20" : "bg-emerald-100"}`}>
                  ⚙️
                </div>
                <span className="font-medium">Workable</span>
              </button>

              <button
                onClick={() => setSidebarFilter("archived")}
                className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                  sidebarFilter === "archived"
                    ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg"
                    : "hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${sidebarFilter === "archived" ? "bg-white/20" : "bg-gray-100"}`}>
                  🗄
                </div>
                <span className="font-medium">Archived</span>
              </button>
            </div>
          </aside>

          {/* ---------------- MAIN CONTENT ---------------- */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Case Management</h1>
              <div className="text-sm text-gray-500">
                {sidebarFilter === "all" ? (
                  <>Showing all {cases.length} cases</>
                ) : sidebarFilter === "high" ? (
                  <>Showing {filteredCases.length} High Priority cases</>
                ) : sidebarFilter === "medium" ? (
                  <>Showing {filteredCases.length} Medium Priority cases</>
                ) : sidebarFilter === "low" ? (
                  <>Showing {filteredCases.length} Low Priority cases</>
                ) : sidebarFilter === "workable" ? (
                  <>Showing {filteredCases.length} Workable cases</>
                ) : sidebarFilter === "archived" ? (
                  <>Showing {filteredCases.length} Archived cases</>
                ) : (
                  <>Showing {filteredCases.length} of {cases.length} cases</>
                )}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search cases by title, number, or party..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                />
              </div>
              <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl flex items-center gap-2 transition-colors">
                <Filter className="h-5 w-5" />
                Filters
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Case Details</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Priority</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Next Hearing</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-lg ${
                            c.priority === 'High' ? 'bg-red-50' : 
                            c.priority === 'Medium' ? 'bg-yellow-50' : 'bg-blue-50'
                          }`}>
                            <FileText className={`h-5 w-5 ${
                              c.priority === 'High' ? 'text-red-500' : 
                              c.priority === 'Medium' ? 'text-yellow-500' : 'text-blue-500'
                            }`} />
                          </div>
                          <div>
                            <div className="font-bold text-blue-600">{c.caseNumber}</div>
                            <div className="font-semibold text-gray-900 mt-1">{c.title}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              <User className="inline h-3 w-3 mr-1" />
                              {c.plaintiff} vs {c.defendant}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              <Calendar className="inline h-3 w-3 mr-1" />
                              Filed: {c.filedDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge color={c.priority}>{c.priority}</Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Badge color={c.status}>{c.status}</Badge>
                          {c.status === 'Scheduled' && <Calendar className="h-4 w-4 text-green-500" />}
                          {c.status === 'In Progress' && <Clock className="h-4 w-4 text-cyan-500" />}
                          {c.status === 'Pending' && <AlertCircle className="h-4 w-4 text-amber-500" />}
                          {c.status === 'Adjourned' && <XCircle className="h-4 w-4 text-gray-500" />}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {c.nextHearing ? (
                          <div>
                            <div className="font-semibold text-gray-900">{c.nextHearing}</div>
                            <div className="text-sm text-gray-500">Court hearing</div>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Not scheduled</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors" title="View Details">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors" title="Edit Case">
                            <FileEdit className="h-5 w-5" />
                          </button>
                          <button className="p-2 hover:bg-purple-50 rounded-lg text-purple-600 transition-colors" title="More Options">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCases.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                    <FileText className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No cases found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery 
                      ? `No results for "${searchQuery}"` 
                      : `No ${sidebarFilter} cases found`
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSidebarFilter("all");
                    }}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Show All Cases
                  </button>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="mt-6 grid grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{cases.length}</div>
                <div className="text-sm text-blue-700">Total Cases</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {cases.filter(c => c.priority === 'High').length}
                </div>
                <div className="text-sm text-red-700">High Priority</div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {cases.filter(c => c.priority === 'Medium').length}
                </div>
                <div className="text-sm text-yellow-700">Medium Priority</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {cases.filter(c => c.priority === 'Low').length}
                </div>
                <div className="text-sm text-blue-700">Low Priority</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- NEW CASE MODAL ---------------- */}
      {isNewCaseModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Create New Case
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Title
                </label>
                <input
                  type="text"
                  placeholder="Enter case title..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white">
                    <option value="CMI">CMI</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Family">Family</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of the case..."
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                />
              </div>
            </div>
            
            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setIsNewCaseModalOpen(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewCase}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                Create Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseManagement;