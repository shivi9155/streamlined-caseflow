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
import { useState } from 'react';

const Parties = () => {
  // Sample parties data
  const initialParties = [
    { 
      id: 1,
      name: "Robert Smith", 
      type: "Individual", 
      cases: 1,
      role: "Petitioner",
      email: "robert.smith@email.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      avatarColor: "bg-blue-500",
      caseNumbers: ["C-2024-001"]
    },
    { 
      id: 2,
      name: "Johnson Properties Ltd.", 
      type: "Organization", 
      cases: 1,
      role: "Respondent",
      email: "legal@johnsonproperties.com",
      phone: "+1 (555) 987-6543",
      status: "Active",
      avatarColor: "bg-purple-500",
      caseNumbers: ["C-2024-002"]
    },
    { 
      id: 3,
      name: "State", 
      type: "Organization", 
      cases: 2,
      role: "Respondent",
      email: "state.attorney@court.gov",
      phone: "+1 (555) 456-7890",
      status: "Active",
      avatarColor: "bg-red-500",
      caseNumbers: ["C-2024-003", "C-2024-004"]
    },
    { 
      id: 4,
      name: "Anil Kumar", 
      type: "Individual", 
      cases: 1,
      role: "Petitioner",
      email: "anil.kumar@email.com",
      phone: "+91 98765 43210",
      status: "Inactive",
      avatarColor: "bg-green-500",
      caseNumbers: ["C-2024-005"]
    },
    { 
      id: 5,
      name: "Priya Sharma", 
      type: "Individual", 
      cases: 1,
      role: "Petitioner",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43211",
      status: "Active",
      avatarColor: "bg-pink-500",
      caseNumbers: ["C-2024-006"]
    },
    { 
      id: 6,
      name: "Rajesh Sharma", 
      type: "Individual", 
      cases: 1,
      role: "Respondent",
      email: "rajesh.sharma@email.com",
      phone: "+91 98765 43212",
      status: "Active",
      avatarColor: "bg-yellow-500",
      caseNumbers: ["C-2024-007"]
    },
  ];

  // State management
  const [parties, setParties] = useState(initialParties);
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

  // Filter and search logic
  const filteredParties = parties.filter(party => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.phone.includes(searchTerm);

    // Type filter
    const matchesType = filters.type === "all" || party.type === filters.type;
    
    // Status filter
    const matchesStatus = filters.status === "all" || party.status === filters.status;
    
    // Role filter
    const matchesRole = filters.role === "all" || party.role === filters.role;

    return matchesSearch && matchesType && matchesStatus && matchesRole;
  });

  // Handle adding new party
  const handleAddParty = () => {
    if (!newParty.name || !newParty.email) {
      alert("Please fill in all required fields");
      return;
    }

    const newPartyObj = {
      id: parties.length + 1,
      name: newParty.name,
      type: newParty.type,
      cases: 0,
      role: newParty.role,
      email: newParty.email,
      phone: newParty.phone,
      status: "Active",
      avatarColor: "bg-gray-500",
      caseNumbers: []
    };

    setParties([...parties, newPartyObj]);
    setNewParty({
      name: "",
      type: "Individual",
      email: "",
      phone: "",
      role: "Petitioner"
    });
    setShowAddPartyModal(false);
    alert("Party added successfully!");
  };

  // Handle exporting parties
  const handleExport = () => {
    const csvContent = [
      ["Name", "Type", "Role", "Email", "Phone", "Cases", "Status"],
      ...filteredParties.map(party => [
        party.name,
        party.type,
        party.role,
        party.email,
        party.phone,
        party.cases,
        party.status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'parties_list.csv';
    a.click();
    alert("Parties exported successfully!");
  };

  // Handle deleting party
  const handleDeleteParty = (id) => {
    if (window.confirm("Are you sure you want to delete this party?")) {
      setParties(parties.filter(party => party.id !== id));
      alert("Party deleted successfully!");
    }
  };

  // Handle sending email
  const handleSendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: "all",
      status: "all",
      role: "all"
    });
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
              placeholder="Search parties by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <Filter size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button 
              onClick={handleExport}
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button 
              onClick={() => setShowAddPartyModal(true)}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <Plus size={16} />
              Add New Party
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900">Filters</h3>
              <button 
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Reset All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Party Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="Individual">Individual</option>
                  <option value="Organization">Organization</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={filters.role}
                  onChange={(e) => setFilters({...filters, role: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="Petitioner">Petitioner</option>
                  <option value="Respondent">Respondent</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredParties.length}</span> of {parties.length} parties
        </p>
        {Object.values(filters).some(f => f !== "all") && (
          <button 
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>

      {/* Parties Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParties.map((party) => (
          <div key={party.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${party.avatarColor} flex items-center justify-center text-white font-bold`}>
                  {party.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{party.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      party.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {party.status}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                      {party.type}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                      {party.role}
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <button className="text-gray-400 hover:text-gray-600">
                  <span className="text-lg">⋯</span>
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden">
                  {/* Dropdown menu would go here */}
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <FileText size={16} className="mr-2 text-gray-400" />
                <span>{party.cases} case{party.cases !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={16} className="mr-2 text-gray-400" />
                <span className="truncate">{party.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={16} className="mr-2 text-gray-400" />
                <span>{party.phone}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between">
              <button 
                onClick={() => handleSendEmail(party.email)}
                className="px-3 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
              >
                <Mail size={14} />
                Email
              </button>
              <button 
                onClick={() => handleDeleteParty(party.id)}
                className="px-3 py-2 text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Delete
              </button>
              <button className="px-3 py-2 text-gray-600 hover:text-gray-700 font-medium text-sm">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredParties.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No parties found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          <button 
            onClick={resetFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Parties</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{parties.length}</p>
            </div>
            <Users size={24} className="text-blue-400" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Individuals</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {parties.filter(p => p.type === "Individual").length}
              </p>
            </div>
            <User size={24} className="text-green-400" />
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Organizations</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {parties.filter(p => p.type === "Organization").length}
              </p>
            </div>
            <Building size={24} className="text-purple-400" />
          </div>
        </div>
      </div>

      {/* Add Party Modal */}
      {showAddPartyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add New Party</h3>
              <button 
                onClick={() => setShowAddPartyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newParty.name}
                  onChange={(e) => setNewParty({...newParty, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  value={newParty.type}
                  onChange={(e) => setNewParty({...newParty, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Individual">Individual</option>
                  <option value="Organization">Organization</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <select
                  value={newParty.role}
                  onChange={(e) => setNewParty({...newParty, role: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Petitioner">Petitioner</option>
                  <option value="Respondent">Respondent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newParty.email}
                  onChange={(e) => setNewParty({...newParty, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newParty.phone}
                  onChange={(e) => setNewParty({...newParty, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setShowAddPartyModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddParty}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={16} />
                Add Party
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Parties;
