
import { Globe, Mail, Shield, Code, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-cyan-500 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">WhoisIPFinder</h3>
                <p className="text-gray-400 text-sm">Professional IP Lookup Tool</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              WhoisIPFinder provides accurate and comprehensive IP address lookup services. 
              Get detailed geolocation information, ISP details, and network data for any IP address 
              with our fast and reliable tool.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">API Ready</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors">
                  IP Lookup Tool
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#api" className="text-gray-300 hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-400">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300">info@whoisipfinder.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300">whoisipfinder.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-2 text-gray-400">Powered by</h5>
              <p className="text-xs text-gray-500">
                IP-API.com for accurate geolocation data
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} WhoisIPFinder. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for network professionals</span>
          </div>
        </div>

        {/* SEO Keywords */}
        <div className="mt-4 text-xs text-gray-600">
          <p>
            Keywords: IP lookup, IP address finder, geolocation, IP tracker, whois IP, 
            IP location finder, IP address location, network tools, IP geolocation API
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
