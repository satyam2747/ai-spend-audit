const AuditResult = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="space-y-4 mb-12">
      <h3 className="text-2xl font-bold text-white mb-6">Detailed Breakdown</h3>
      {results.map((res, index) => (
        <div 
          key={index} 
          className={`bg-slate-50 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-l-8 transition-transform hover:scale-[1.01] shadow-xl ${
            res.status === 'overspending' ? 'border-savings' : 
            res.status === 'redundant' ? 'border-orange-500' : 
            res.status === 'suggestion' ? 'border-blue-500' : 'border-gray-300'
          }`}
        >
          <div className="flex-1">
            <h4 className="text-navy-900 text-xl font-bold mb-1">{res.toolName}</h4>
            <p className="text-gray-600 italic mb-2 md:mb-0">"{res.reason}"</p>
          </div>
          
          <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-0 mt-4 md:mt-0">
            <div className="text-right">
              <span className="text-xs text-gray-400 uppercase font-bold block">Recommendation</span>
              <span className={`font-bold ${
                res.status === 'overspending' ? 'text-savings' : 
                res.status === 'redundant' ? 'text-orange-500' : 
                res.status === 'suggestion' ? 'text-blue-500' : 'text-gray-400'
              }`}>
                {res.recommendation}
              </span>
            </div>
            
            {res.monthlySaving > 0 && (
              <div className="text-savings font-bold mt-1">
                Save ${res.monthlySaving.toLocaleString()}/mo
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuditResult;
