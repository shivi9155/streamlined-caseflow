import Sidebar from "./Sidebar";
import Navbar from "../components/Navbar"; // Add this import

const DashboardLayout = ({ title, subtitle, active, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add Navbar */}
      <Navbar />
      
      <div className="flex pt-16"> {/* Add padding for fixed navbar */}
        <Sidebar active={active} />

        <div className="flex-1 p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h1>
            <p className="text-slate-600 mt-2">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;