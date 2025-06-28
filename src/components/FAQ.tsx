
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is an IP address?",
      answer: "An IP address (Internet Protocol address) is a unique numerical identifier assigned to every device connected to the internet. It serves as a digital address that allows devices to communicate with each other across networks."
    },
    {
      question: "How accurate is IP geolocation?",
      answer: "IP geolocation accuracy varies depending on the IP address type. For most IP addresses, city-level accuracy ranges from 75-90%, while country-level accuracy is typically above 95%. Mobile and satellite connections may have lower accuracy."
    },
    {
      question: "Can I lookup any IP address?",
      answer: "Yes, you can lookup most public IP addresses. However, private IP addresses (like 192.168.x.x, 10.x.x.x) and localhost addresses cannot be geolocated as they are used for local networks only."
    },
    {
      question: "Is IP lookup legal?",
      answer: "Yes, IP lookup is completely legal. IP addresses are publicly available information when you connect to the internet. Our service only provides publicly available geolocation and network information."
    },
    {
      question: "What information can I get from an IP lookup?",
      answer: "Our IP lookup tool provides comprehensive information including geographic location (country, region, city), ISP details, organization name, timezone, coordinates, postal code, and AS (Autonomous System) information."
    },
    {
      question: "Why does my IP show a different location?",
      answer: "Your IP location might differ from your actual location due to VPN usage, proxy servers, mobile networks, or ISP routing. The location shown represents where your internet connection appears to originate from."
    },
    {
      question: "How often is the IP database updated?",
      answer: "Our IP geolocation database is updated regularly to ensure accuracy. The IP-API service we use maintains one of the most current and comprehensive IP databases available."
    },
    {
      question: "Can I use this tool for commercial purposes?",
      answer: "Yes, our IP lookup tool can be used for various purposes including security analysis, content localization, fraud prevention, and network troubleshooting. Please ensure compliance with applicable laws and regulations."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-brand-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about IP address lookup and geolocation
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="text-gray-800">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-brand-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </CardTitle>
              </CardHeader>
              
              {openIndex === index && (
                <CardContent className="pt-0 animate-fade-in">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border-0 bg-gradient-to-r from-brand-50 to-cyan-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                About IP Address Lookup & Geolocation
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Why Use IP Lookup?
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Security analysis and threat detection
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Content localization and geo-targeting
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Network troubleshooting and diagnostics
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Fraud prevention and compliance
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Our Features
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Real-time IP geolocation data
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Comprehensive network information
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Fast and accurate results
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Free and easy to use
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
