const SavingsHero = ({ totalMonthlySavings, totalAnnualSavings }) => {
  return (
    <div className="bg-navy-800/50 border border-navy-700 rounded-3xl p-8 text-center mb-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-savings/30"></div>
      <h2 className="text-gray-400 text-lg font-medium mb-2 uppercase tracking-widest">Estimated Monthly Savings</h2>
      <div className="text-7xl md:text-8xl font-black text-savings mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
        ${totalMonthlySavings.toLocaleString()}
      </div>
      <div className="bg-savings/10 inline-block px-4 py-2 rounded-full border border-savings/20">
        <span className="text-white font-semibold">
          That's <span className="text-savings font-bold">${totalAnnualSavings.toLocaleString()}</span> per year
        </span>
      </div>
    </div>
  );
};

export default SavingsHero;
