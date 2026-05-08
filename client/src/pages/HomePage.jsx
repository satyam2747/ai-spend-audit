import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 text-center">
        <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
          Find Out If You're Overpaying <br />
          <span className="text-savings">for AI Tools</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Free audit for startups. See where your team overspends on ChatGPT, Claude, Cursor, and more.
        </p>
        <Link 
          to="/audit" 
          className="inline-block bg-savings hover:bg-savings/90 text-navy-900 text-xl font-black px-12 py-5 rounded-2xl transition-transform hover:scale-105 shadow-2xl"
        >
          Audit My AI Stack Free
        </Link>
        
        <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-50 grayscale">
          <span className="text-white font-bold text-xl uppercase tracking-tighter italic">Startup Inc.</span>
          <span className="text-white font-bold text-xl uppercase tracking-tighter italic">VentureCo</span>
          <span className="text-white font-bold text-xl uppercase tracking-tighter italic">GrowthLab</span>
          <span className="text-white font-bold text-xl uppercase tracking-tighter italic">FounderHub</span>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-navy-800/30 py-24 border-y border-navy-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Enter your tools', desc: 'Select your tools, plans, and team size.' },
              { step: '2', title: 'Get instant results', desc: 'Our engine identifies overspending instantly.' },
              { step: '3', title: 'Switch and save', desc: 'Follow the plan and reduce your burn rate.' }
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 bg-navy-800 text-savings border border-navy-700 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 group-hover:border-savings transition-colors">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-32 text-center">
        <div className="bg-navy-800 border border-navy-700 p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to stop wasting money?</h2>
          <p className="text-gray-400 mb-10 text-lg">Join 500+ founders who saved an average of $340/month.</p>
          <Link 
            to="/audit" 
            className="inline-block bg-savings hover:bg-savings/90 text-navy-900 text-lg font-bold px-10 py-4 rounded-xl transition-all"
          >
            Start My Free Audit
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
