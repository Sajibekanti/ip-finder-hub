
import { Search, Globe, Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-brand-800 to-brand-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-cyan-500 p-2 rounded-lg">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">WhoisIPFinder</h1>
              <p className="text-cyan-200 text-sm">Professional IP Lookup Tool</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-white hover:text-cyan-200 transition-colors font-medium">
              Home
            </a>
            <a href="#tools" className="text-white hover:text-cyan-200 transition-colors font-medium">
              Tools
            </a>
            <a href="#about" className="text-white hover:text-cyan-200 transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-white hover:text-cyan-200 transition-colors font-medium">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-cyan-200" />
            <span className="text-cyan-200 text-sm hidden sm:inline">Secure & Fast</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
