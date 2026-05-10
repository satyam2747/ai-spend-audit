import { useState, useEffect } from 'react';

const SavingsHero = ({ totalAnnualSavings }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = totalAnnualSavings || 0;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalDuration = 2000;
    const incrementTime = 20; // 50fps
    const totalSteps = totalDuration / incrementTime;
    const step = end / totalSteps;
    
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [totalAnnualSavings]);

  return (
    <div className="bg-navy-800/50 border border-navy-700 rounded-3xl p-8 text-center mb-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-savings/30"></div>
      <h2 className="text-gray-400 text-lg font-medium mb-2 uppercase tracking-widest">Total Potential Annual Savings</h2>
      <div className="text-7xl md:text-8xl font-black text-savings mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
        ${count.toLocaleString()}
      </div>
      <p className="text-gray-400 text-sm font-medium">Share this audit with your team or investors</p>
    </div>
  );
};

export default SavingsHero;
