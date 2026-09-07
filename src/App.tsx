import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Result from './pages/Result';
import Knowledge from './pages/Knowledge';
import Solutions from './pages/Solutions';
import ApiDocs from './pages/ApiDocs';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/result/:id" element={<Result />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
