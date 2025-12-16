import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Parties from "./pages/Parties";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/parties" element={<Parties />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
