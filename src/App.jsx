import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CaseManagement from './pages/CaseManagement';
import Layout from './components/Layout';
import Analytics from "./pages/analytics";
import Parties from "./pages/parties";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/cases" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <CaseManagement />
            </Layout>
          } />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/analytics" element={<Analytics />} />
            <Route path="/parties" element={<Parties />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;