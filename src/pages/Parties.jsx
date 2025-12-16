import DashboardLayout from "../layouts/DashboardLayout";

const parties = [
  { name: "Robert Smith", type: "Individual", cases: 1 },
  { name: "Johnson Properties Ltd.", type: "Organization", cases: 1 },
  { name: "State", type: "Organization", cases: 2 },
  { name: "Anil Kumar", type: "Individual", cases: 1 },
  { name: "Priya Sharma", type: "Individual", cases: 1 },
  { name: "Rajesh Sharma", type: "Individual", cases: 1 },
];

const Parties = () => {
  return (
    <DashboardLayout
      title="Parties"
      subtitle="Petitioners and respondents in registered cases"
      active="Parties"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parties.map((p, i) => (
          <div key={i} className="card p-6">
            <h3 className="font-semibold text-slate-900">{p.name}</h3>

            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-600">
              {p.type}
            </span>

            <p className="mt-4 text-sm text-slate-500">
              📄 {p.cases} case
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Parties;