import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuditPage from './pages/AuditPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-navy-900 text-white selection:bg-savings/30">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/result/:publicId" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
