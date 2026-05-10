import { useState } from 'react';

const EmailCapture = ({ onSubmit, totalMonthlySavings }) => {
  const [formData, setFormData] = useState({ email: '', company: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSubmit(formData);
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }, 1000);
  };

  const isHighSaving = totalMonthlySavings > 500;

  if (submitted) {
    return (
      <div className="bg-navy-800 rounded-3xl p-12 border border-navy-700 shadow-2xl text-center animate-in zoom-in-95 duration-300">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-3xl font-bold text-white mb-2">Success!</h3>
        <p className="text-gray-400">Check your email for the full report.</p>
      </div>
    );
  }

  return (
    <div className="bg-navy-800 rounded-3xl p-8 border border-navy-700 shadow-2xl overflow-hidden relative">
      {isHighSaving && (
        <div className="absolute top-0 right-0 bg-savings text-navy-900 px-4 py-1 font-bold text-xs uppercase rounded-bl-lg">
          High Impact
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-2">
          {isHighSaving ? "Get Your Expert Audit" : "Save Your Results"}
        </h3>
        <p className="text-gray-400">
          {isHighSaving 
            ? "Your savings are significant. Let Credex help you optimize your entire tech stack." 
            : "We'll send you the full breakdown and notify you of new tool optimizations."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          required
          type="email"
          placeholder="Work Email"
          className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-savings"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Company"
            className="w-1/2 bg-navy-900 border border-navy-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-savings"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
          />
          <input
            type="text"
            placeholder="Role"
            className="w-1/2 bg-navy-900 border border-navy-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-savings"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-savings hover:bg-savings/90 text-navy-900 font-bold py-4 rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? 'Processing...' : isHighSaving ? 'Book Free Credex Consultation' : 'Get Full Audit Report'}
        </button>
      </form>
    </div>
  );
};

export default EmailCapture;
