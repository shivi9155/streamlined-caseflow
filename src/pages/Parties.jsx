import DashboardLayout from "../Layouts/DashboardLayout";
import { 
  Users, 
  Building, 
  User, 
  Search, 
  Filter, 
  Plus,
  X,
  Download,
  Mail,
  Phone,
  FileText
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Parties = () => {
  // 1. Start with an empty array for database data
  const [parties, setParties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddPartyModal, setShowAddPartyModal] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    role: "all"
  });
  const [newParty, setNewParty] = useState({
    name: "",
    type: "Individual",
    email: "",
    phone: "",
    role: "Petitioner"
  });

  // 2. FETCH AND TRANSFORM DATA FROM DATABASE
  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cases");
        const cases = await response.json();

        // We transform each case into TWO parties (Petitioner & Respondent)
        const transformedData = [];
        cases.forEach((c) => {
          // Add Petitioner (Plaintiff)
          transformedData.push({
            id: `${c._id}-pet`,
            name: c.plaintiff,
            type: "Individual", 
            cases: 1,
            role: "Petitioner",
            email: "not-set@court.gov",
            phone: "N/A",
            status: "Active",
            avatarColor: "bg-blue-500",
            caseNumbers: [c.caseNumber]
          });

          // Add Respondent (Defendant)
          transformedData.push({
            id: `${c._id}-res`,
            name: c.defendant,
            type: c.defendant.toLowerCase().includes("ltd") || c.defendant.toLowerCase().includes("corp") ? "Organization" : "Individual",
            cases: 1,
            role: "Respondent",
            email: "not-set@court.gov",
            phone: "N/A",
            status: "Active",
            avatarColor: "bg-purple-500",
            caseNumbers: [c.caseNumber]
          });
        });

        setParties(transformedData);
      } catch (error) {
        console.error("Error fetching parties:", error);
      }
    };

    fetchParties();
  }, []);

  // Filter and search logic (Updated to use dynamic parties state)
  const filteredParties = parties.filter(party => {
    const matchesSearch = searchTerm === "" || 
      party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.phone.includes(searchTerm);

    const matchesType = filters.type === "all" || party.type === filters.type;
    const matchesStatus = filters.status === "all" || party.status === filters.status;
    const matchesRole = filters.role === "all" || party.role === filters.role;

    return matchesSearch && matchesType && matchesStatus && matchesRole;
  });

  // Handle adding new party manually (Optional: usually added via Case Registration)
  const handleAddParty = () => {
    if (!newParty.name || !newParty.email) {
      alert("Please fill in all required fields");
      return;
    }

    const newPartyObj = {
      id: Date.now(),
      ...newParty,
      cases: 0,
      status: "Active",
      avatarColor: "bg-gray-500",
      caseNumbers: []
    };

    setParties([...parties, newPartyObj]);
    setShowAddPartyModal(false);
  };

  const handleExport = () => {
    const csvContent = [
      ["Name", "Type", "Role", "Email", "Phone", "Cases", "Status"],
      ...filteredParties.map(party => [
        party.name, party.type, party.role, party.email, party.phone, party.cases, party.status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'parties_list.csv';
    a.click();
  };

  const handleDeleteParty = (id) => {
    if (window.confirm("Are you sure?")) {
      setParties(parties.filter(party => party.id !== id));
    }
  };

  const handleSendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const resetFilters = () => {
    setFilters({ type: "all", status: "all", role: "all" });
    setSearchTerm("");
  };

  return (
    <DashboardLayout
      title="Parties Management"
      subtitle="Petitioners and respondents in registered cases"
      active="Parties"
    >
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search parties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-3 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter size={16} /> {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button onClick={handleExport} className="px-4 py-3 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download size={16} /> Export CSV
            </button>
            <button onClick={() => setShowAddPartyModal(true)} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus size={16} /> Add New Party
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})} className="border rounded-lg px-3 py-2">
                <option value="all">All Types</option>
                <option value="Individual">Individual</option>
                <option value="Organization">Organization</option>
              </select>
              <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="border rounded-lg px-3 py-2">
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select value={filters.role} onChange={(e) => setFilters({...filters, role: e.target.value})} className="border rounded-lg px-3 py-2">
                <option value="all">All Roles</option>
                <option value="Petitioner">Petitioner</option>
                <option value="Respondent">Respondent</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-4 flex justify-between items-center text-sm text-gray-600">
        <p>Showing <b>{filteredParties.length}</b> parties</p>
      </div>

      {/* Parties Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParties.map((party) => (
          <div key={party.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${party.avatarColor} flex items-center justify-center text-white font-bold`}>
                {party.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{party.name}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-50 text-blue-600 font-bold uppercase">{party.role}</span>
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-600 font-bold uppercase">{party.type}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2 border-t pt-4">
              <div className="flex items-center text-xs text-gray-600"><FileText size={14} className="mr-2 opacity-50"/> Case: {party.caseNumbers[0]}</div>
              <div className="flex items-center text-xs text-gray-600"><Mail size={14} className="mr-2 opacity-50"/> {party.email}</div>
            </div>
            
            <div className="mt-4 flex justify-between gap-2">
              <button onClick={() => handleSendEmail(party.email)} className="text-xs font-bold text-blue-600 hover:underline">Email</button>
              <button onClick={() => handleDeleteParty(party.id)} className="text-xs font-bold text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 flex justify-between items-center">
          <div><p className="text-xs text-blue-600 font-bold uppercase">Total Parties</p><p className="text-2xl font-bold text-blue-900">{parties.length}</p></div>
          <Users size={32} className="text-blue-200" />
        </div>
        <div className="bg-green-50 rounded-xl p-6 flex justify-between items-center">
          <div><p className="text-xs text-green-600 font-bold uppercase">Petitioners</p><p className="text-2xl font-bold text-green-900">{parties.filter(p=>p.role==="Petitioner").length}</p></div>
          <User size={32} className="text-green-200" />
        </div>
        <div className="bg-purple-50 rounded-xl p-6 flex justify-between items-center">
          <div><p className="text-xs text-purple-600 font-bold uppercase">Respondents</p><p className="text-2xl font-bold text-purple-900">{parties.filter(p=>p.role==="Respondent").length}</p></div>
          <Building size={32} className="text-purple-200" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Parties;