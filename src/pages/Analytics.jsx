import DashboardLayout from "../Layouts/DashboardLayout";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const categoryData = [
  { name: "Civil", value: 25 },
  { name: "Criminal", value: 25 },
  { name: "Family", value: 25 },
  { name: "Commercial", value: 25 },
];

const statusData = [
  { name: "Pending", cases: 45 },
  { name: "In Progress", cases: 32 },
  { name: "Scheduled", cases: 28 },
  { name: "Resolved", cases: 85 },
];

const COLORS = ["#0EA5E9", "#EF4444", "#10B981", "#F59E0B"];

const Analytics = () => {
  return (
    <DashboardLayout
      title="Analytics Dashboard"
      subtitle="Case distribution and workflow insights"
      active="Analytics"
    >
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Cases</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">2,847</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-xl md:text-2xl">📋</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Today</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">48</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-xl md:text-2xl">⚡</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Decisions</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">156</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <span className="text-xl md:text-2xl">⏳</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Resolved Rate</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">92%</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <span className="text-xl md:text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cases by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cases by Status</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="cases" 
                  radius={[4, 4, 0, 0]}
                  fill="#10B981"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;