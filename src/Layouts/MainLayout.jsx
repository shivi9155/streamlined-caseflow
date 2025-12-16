import { motion } from "framer-motion";

const MainLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">

      {/* Navbar */}
      <nav className="bg-white/70 backdrop-blur-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900 tracking-wide">
            ⚖️ DCFM
          </h1>

          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="/" className="hover:text-blue-800 transition">Home</a>
            <a href="/analytics" className="hover:text-blue-800 transition">Analytics</a>
            <a href="/parties" className="hover:text-blue-800 transition">Parties</a>
          </div>

          <button className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition">
            Admin Portal
          </button>
        </div>
      </nav>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 pt-20 pb-12"
      >
        <h2 className="text-5xl font-bold text-blue-900">
          {title}
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl text-lg">
          {subtitle}
        </p>
      </motion.header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
