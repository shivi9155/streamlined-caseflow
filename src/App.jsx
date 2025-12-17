import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CaseManagement from "./pages/CaseManagement";
import Layout from "./components/Layout";
import Analytics from "./pages/Analytics";
import Parties from "./pages/Parties";
import Authpage from "./pages/Authpage";
import SchedulePage from "./pages/SchedulePage"; // Import the SchedulePage

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? "dark" : ""}>
        <Routes>
          <Route
            path="/"
            element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />

          <Route path="/auth" element={<Authpage />} />

          {/* Protected routes with Layout wrapper */}
          <Route
            path="/cases"
            element={
              <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <CaseManagement />
              </Layout>
            }
          />

          <Route
            path="/analytics"
            element={
              <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Analytics />
              </Layout>
            }
          />

          <Route
            path="/parties"
            element={
              <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Parties />
              </Layout>
            }
          />

          {/* NEW: Schedule Page Route */}
          <Route
            path="/schedulepage"
            element={
              <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <SchedulePage />
              </Layout>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;