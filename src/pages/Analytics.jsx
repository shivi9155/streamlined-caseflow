import DashboardLayout from "../Layouts/DashboardLayout";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const categoryData = [
  { name: "Civil", value: 25 },
  { name: "Criminal", value: 25 },
  { name: "Family", value: 25 },
  { name: "Commercial", value: 25 },
];

const statusData = [
  { name: "Pending", cases: 2 },
  { name: "In Progress", cases: 2 },
  { name: "Scheduled", cases: 2 },
  { name: "Resolved", cases: 1 },
];

const COLORS = ["#0EA5E9", "#EF4444", "#10B981", "#F59E0B"];

const Analytics = () => {
  return (
    <DashboardLayout
      title="Analytics"
      subtitle="Case distribution and workflow insights"
      active="Analytics"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Pie */}
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Cases by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                innerRadius={80}
                outerRadius={120}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar */}
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Cases by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#10B981" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Analytics;
