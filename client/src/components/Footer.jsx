const Footer = () => {
  return (
    <footer className="bg-navy-900 border-t border-navy-800 py-12 mt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="text-xl font-bold text-white mb-2">
          Spend<span className="text-savings">Audit</span>
        </div>
        <p className="text-gray-400 mb-6">Built for founders who ship.</p>
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} SpendAudit. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
