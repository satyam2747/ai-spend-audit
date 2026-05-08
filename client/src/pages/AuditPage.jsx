import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TOOLS_DATA, USE_CASES } from '../data/toolsData';
import { runAudit } from '../utils/auditEngine';
import { saveAudit } from '../api';

const AuditPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTools, setSelectedTools] = useState([]);
  const [toolConfigs, setToolConfigs] = useState({});
  const [teamInfo, setTeamInfo] = useState({ size: 1, useCase: 'mixed' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('audit_draft');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelectedTools(parsed.selectedTools || []);
      setToolConfigs(parsed.toolConfigs || {});
      setTeamInfo(parsed.teamInfo || { size: 1, useCase: 'mixed' });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('audit_draft', JSON.stringify({ selectedTools, toolConfigs, teamInfo }));
  }, [selectedTools, toolConfigs, teamInfo]);

  const toggleTool = (toolId) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(id => id !== toolId));
    } else {
      setSelectedTools([...selectedTools, toolId]);
      const tool = TOOLS_DATA.find(t => t.id === toolId);
      setToolConfigs({
        ...toolConfigs,
        [toolId]: { planId: tool.plans[0].id, seats: 1, monthlySpend: tool.plans[0].price }
      });
    }
  };

  const handleConfigChange = (toolId, field, value) => {
    setToolConfigs({
      ...toolConfigs,
      [toolId]: { ...toolConfigs[toolId], [field]: value }
    });
  };

  const handleRunAudit = async () => {
    setLoading(true);
    try {
      const formattedTools = selectedTools.map(id => ({
        toolId: id,
        toolName: TOOLS_DATA.find(t => t.id === id).name,
        ...toolConfigs[id]
      }));
      
      const auditResults = runAudit(formattedTools, teamInfo.size, teamInfo.useCase);
      
      // Save to Backend
      const { publicId } = await saveAudit({
        tools: formattedTools,
        teamSize: teamInfo.size,
        useCase: teamInfo.useCase,
        auditResults: auditResults.results,
        totalMonthlySavings: auditResults.totalMonthlySavings,
        totalAnnualSavings: auditResults.totalAnnualSavings
      });

      localStorage.setItem('audit_results', JSON.stringify(auditResults));
      localStorage.setItem('current_audit_id', publicId);
      navigate(`/result/${publicId}`);
    } catch (error) {
      console.error('Failed to save audit:', error);
      alert('Error saving audit results. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-12 max-w-4xl">
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-2 flex-1 rounded-full ${step >= s ? 'bg-savings' : 'bg-navy-800'}`}></div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold text-white mb-2">What AI tools do you use?</h1>
            <p className="text-gray-400 mb-8">Select all that apply to your team.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TOOLS_DATA.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  className={`p-6 rounded-2xl border-2 transition-all text-center group ${
                    selectedTools.includes(tool.id) 
                      ? 'border-savings bg-savings/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                      : 'border-navy-800 bg-navy-800/50 hover:border-navy-700'
                  }`}
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tool.emoji}</div>
                  <div className="font-bold text-white">{tool.name}</div>
                </button>
              ))}
            </div>
            <div className="mt-12 flex justify-end">
              <button 
                disabled={selectedTools.length === 0}
                onClick={() => setStep(2)}
                className="bg-savings text-navy-900 px-10 py-4 rounded-xl font-bold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold text-white mb-2">Configure Plans</h1>
            <p className="text-gray-400 mb-8">Tell us about your current usage.</p>
            <div className="space-y-6">
              {selectedTools.map(toolId => {
                const tool = TOOLS_DATA.find(t => t.id === toolId);
                const config = toolConfigs[toolId];
                return (
                  <div key={toolId} className="bg-navy-800/50 border border-navy-800 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{tool.emoji}</span>
                      <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Current Plan</label>
                        <select 
                          className="w-full bg-navy-900 border border-navy-700 rounded-lg p-3 text-white"
                          value={config.planId}
                          onChange={(e) => handleConfigChange(toolId, 'planId', e.target.value)}
                        >
                          {tool.plans.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price}/mo)</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Seats</label>
                        <input 
                          type="number" 
                          min="1"
                          className="w-full bg-navy-900 border border-navy-700 rounded-lg p-3 text-white"
                          value={config.seats}
                          onChange={(e) => handleConfigChange(toolId, 'seats', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Monthly Spend ($)</label>
                        <input 
                          type="number"
                          className="w-full bg-navy-900 border border-navy-700 rounded-lg p-3 text-white"
                          value={config.monthlySpend}
                          onChange={(e) => handleConfigChange(toolId, 'monthlySpend', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-12 flex justify-between">
              <button onClick={() => setStep(1)} className="text-gray-400 font-bold px-8">Back</button>
              <button onClick={() => setStep(3)} className="bg-savings text-navy-900 px-10 py-4 rounded-xl font-bold">Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold text-white mb-2">Final Details</h1>
            <p className="text-gray-400 mb-8">Almost there! Just a bit more context.</p>
            <div className="bg-navy-800/50 border border-navy-800 rounded-3xl p-8 space-y-8">
              <div>
                <label className="text-xl font-bold text-white mb-4 block">How many people are in your team?</label>
                <input 
                  type="range" min="1" max="100" 
                  className="w-full h-2 bg-navy-900 rounded-lg appearance-none cursor-pointer accent-savings"
                  value={teamInfo.size}
                  onChange={(e) => setTeamInfo({...teamInfo, size: parseInt(e.target.value)})}
                />
                <div className="text-center text-3xl font-black text-savings mt-4">{teamInfo.size} users</div>
              </div>
              <div>
                <label className="text-xl font-bold text-white mb-4 block">Primary Use Case</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {USE_CASES.map(uc => (
                    <button
                      key={uc.id}
                      onClick={() => setTeamInfo({...teamInfo, useCase: uc.id})}
                      className={`p-4 rounded-xl border-2 transition-all font-bold ${
                        teamInfo.useCase === uc.id ? 'border-savings bg-savings/10 text-white' : 'border-navy-700 bg-navy-900 text-gray-400'
                      }`}
                    >
                      {uc.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 flex justify-between">
              <button onClick={() => setStep(2)} className="text-gray-400 font-bold px-8">Back</button>
              <button 
                onClick={handleRunAudit}
                disabled={loading}
                className="bg-savings text-navy-900 px-12 py-5 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-transform disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Run Free Audit'}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AuditPage;
