import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CaseManagement from "./pages/CaseManagement";
import Layout from "./components/Layout";
import Analytics from "./pages/Analytics";
import Parties from "./pages/Parties";
import Authpage from "./pages/Authpage";
import SchedulePage from "./pages/SchedulePage";
// import LearnMore from "./pages/LearnMore";
import Dashboard from "./pages/Dashboard"; // Add this import

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
            path="/home"
            element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />

          <Route path="/" element={<Authpage />} />

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

          <Route
            path="/schedule"
            element={
              <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <SchedulePage />
              </Layout>
            }
          />

          {/* Dashboard route (has its own navbar) */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Learn More route (has its own navbar) */}
          {/* <Route
            path="/learn-more"
            element={<LearnMore />}
          /> */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;