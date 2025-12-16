import Sidebar from "./Sidebar";

const DashboardLayout = ({ title, subtitle, active, children }) => {
  return (
    <div className="flex">
      <Sidebar active={active} />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            <p className="text-slate-500 text-sm">{subtitle}</p>
          </div>

          <input
            type="text"
            placeholder="Search cases..."
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none"
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

