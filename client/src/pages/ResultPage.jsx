import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SavingsHero from '../components/SavingsHero';
import AuditResult from '../components/AuditResult';
import EmailCapture from '../components/EmailCapture';
import { getAudit, saveLead, getAuditSummary } from '../api';

const ResultPage = () => {
  const navigate = useNavigate();
  const { publicId } = useParams();
  const [auditData, setAuditData] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [error, setError] = useState(null);

  const currentId = publicId || localStorage.getItem('current_audit_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (publicId) {
          const data = await getAudit(publicId);
          setAuditData(data);
          if (data.aiSummary) setSummary(data.aiSummary);
        } else {
          const saved = localStorage.getItem('audit_results');
          if (!saved) {
            navigate('/audit');
            return;
          }
          setAuditData(JSON.parse(saved));
        }
      } catch (err) {
        console.error('Error fetching audit:', err);
        setError('Could not load audit results. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [publicId, navigate]);

  useEffect(() => {
    if (currentId && !summary && auditData) {
      setSummaryLoading(true);
      getAuditSummary(currentId)
        .then(res => setSummary(res.summary))
        .catch(err => console.error('Summary error:', err))
        .finally(() => setSummaryLoading(false));
    }
  }, [currentId, auditData, summary]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/result/${currentId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeadSubmit = async (formData) => {
    try {
      await saveLead({
        ...formData,
        teamSize: auditData.teamSize || JSON.parse(localStorage.getItem('audit_draft')).teamInfo.size,
        totalMonthlySavings: auditData.totalMonthlySavings,
        auditPublicId: currentId
      });
      setEmailSuccess(true);
      setTimeout(() => setEmailSuccess(false), 5000);
    } catch (err) {
      console.error('Error saving lead:', err);
      alert('There was an error saving your details.');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center text-white">
      <div className="w-12 h-12 border-4 border-savings border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-xl font-medium">Analyzing your spend data...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center text-white p-4 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold mb-4">{error}</h2>
      <button 
        onClick={() => window.location.reload()}
        className="bg-savings text-navy-900 px-8 py-3 rounded-xl font-bold"
      >
        Try Again
      </button>
    </div>
  );

  if (!auditData) return null;

  return (
    <div className="min-h-screen bg-navy-900 relative">
      <Navbar />
      
      {/* Email Success Toast */}
      {emailSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-savings text-navy-900 px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2">
            <span>✅</span> Results sent to your email!
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Your Audit is Ready!</h1>
          <p className="text-gray-400 text-lg md:text-xl">We found some serious room for optimization.</p>
        </div>

        <SavingsHero 
          totalMonthlySavings={auditData.totalMonthlySavings}
          totalAnnualSavings={auditData.totalAnnualSavings}
        />

        <div className="bg-navy-800/50 rounded-3xl p-6 md:p-8 border border-navy-700 mb-12 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✨</span>
            <h3 className="text-2xl font-bold text-white">AI Analysis</h3>
            {summaryLoading && <div className="ml-2 w-4 h-4 border-2 border-savings border-t-transparent rounded-full animate-spin"></div>}
          </div>
          
          {summary ? (
            <p className="text-gray-300 leading-relaxed italic animate-in fade-in duration-700">
              "{summary}"
            </p>
          ) : summaryLoading ? (
            <div className="space-y-2">
              <div className="h-4 bg-navy-900/50 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-navy-900/50 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-navy-900/50 rounded w-4/6 animate-pulse"></div>
            </div>
          ) : (
            <p className="text-gray-500 italic">Analysis summary unavailable. Refer to breakdown below.</p>
          )}
        </div>

        <AuditResult results={auditData.auditResults || auditData.results} />

        <div className="bg-navy-800/30 rounded-2xl p-6 border border-dashed border-navy-700 mb-12 text-center">
          <p className="text-gray-500 mb-2 font-medium">Share this audit with your team:</p>
          <div className="flex flex-col md:flex-row gap-2">
            <input 
              readOnly 
              value={`${window.location.origin}/result/${currentId}`}
              className="flex-1 bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-400 text-sm focus:outline-none"
            />
            <button 
              onClick={handleCopyLink}
              className={`px-8 py-3 rounded-lg font-bold text-sm transition-all shadow-lg min-h-[44px] ${
                copied ? 'bg-savings text-navy-900' : 'bg-navy-700 text-white hover:bg-navy-600'
              }`}
            >
              {copied ? 'Copied Link!' : 'Copy Link'}
            </button>
          </div>
        </div>

        <EmailCapture 
          totalMonthlySavings={auditData.totalMonthlySavings}
          onSubmit={handleLeadSubmit}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ResultPage;
