import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-navy-800 overflow-hidden">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white tracking-tight shrink-0">
          Spend<span className="text-savings">Audit</span>
        </Link>
        <Link 
          to="/audit" 
          className="bg-savings hover:bg-savings/90 text-navy-900 text-xs sm:text-sm px-3 py-2 sm:px-6 sm:py-2 rounded-lg font-bold transition-all shadow-lg hover:shadow-savings/20 whitespace-nowrap"
        >
          Audit My Stack
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
