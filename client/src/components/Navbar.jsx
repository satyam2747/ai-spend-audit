import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-navy-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white tracking-tight">
          Spend<span className="text-savings">Audit</span>
        </Link>
        <Link 
          to="/audit" 
          className="bg-savings hover:bg-savings/90 text-navy-900 px-6 py-2 rounded-lg font-bold transition-all shadow-lg hover:shadow-savings/20"
        >
          Audit My Stack
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
