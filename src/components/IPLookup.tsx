import { useState, useEffect } from 'react';
import { Search, MapPin, Globe, Clock, Wifi, Building, Shield, Loader2, Key, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface IPInfo {
  query: string;
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

const IPLookup = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [autoDetected, setAutoDetected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [tempApiKey, setTempApiKey] = useState('');
  const [showApiDialog, setShowApiDialog] = useState(false);
  const { toast } = useToast();

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('ipapi_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Auto-detect user's IP on component mount
  useEffect(() => {
    const detectUserIP = async () => {
      try {
        setLoading(true);
        const url = apiKey 
          ? `https://pro.ip-api.com/json/?key=${apiKey}`
          : 'http://ip-api.com/json/';
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'success') {
          setIpInfo(data);
          setIpAddress(data.query);
          setAutoDetected(true);
        } else if (data.status === 'fail') {
          console.error('IP detection failed:', data.message);
          // Fall back to free API if pro API fails
          if (apiKey) {
            const fallbackResponse = await fetch('http://ip-api.com/json/');
            const fallbackData = await fallbackResponse.json();
            if (fallbackData.status === 'success') {
              setIpInfo(fallbackData);
              setIpAddress(fallbackData.query);
              setAutoDetected(true);
            }
          }
        }
      } catch (error) {
        console.error('Error detecting IP:', error);
      } finally {
        setLoading(false);
      }
    };

    detectUserIP();
  }, [apiKey]);

  const lookupIP = async (ip?: string) => {
    const searchIP = ip || ipAddress;
    if (!searchIP.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid IP address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const url = apiKey 
        ? `https://pro.ip-api.com/json/${searchIP}?key=${apiKey}`
        : `http://ip-api.com/json/${searchIP}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'success') {
        setIpInfo(data);
        setAutoDetected(false);
        toast({
          title: "Success",
          description: "IP information retrieved successfully"
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to retrieve IP information",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem('ipapi_key', tempApiKey.trim());
      setApiKey(tempApiKey.trim());
      setShowApiDialog(false);
      toast({
        title: "Success",
        description: "API key saved successfully"
      });
    } else {
      localStorage.removeItem('ipapi_key');
      setApiKey('');
      setShowApiDialog(false);
      toast({
        title: "Success",
        description: "API key removed"
      });
    }
    setTempApiKey('');
  };

  const InfoCard = ({ icon: Icon, title, value, color = "text-gray-600" }: {
    icon: any;
    title: string;
    value: string;
    color?: string;
  }) => (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
      <Icon className={`h-5 w-5 mt-0.5 ${color}`} />
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-3">
              <h2 className="text-3xl font-bold text-gray-800">
                IP Address Lookup Tool
              </h2>
              <Dialog open={showApiDialog} onOpenChange={setShowApiDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="h-4 w-4" />
                    API Settings
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      IP-API.com API Key Settings
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Enter your IP-API.com API key for enhanced features and higher rate limits.
                      </p>
                      <Input
                        type="password"
                        placeholder="Enter your API key (optional)"
                        value={tempApiKey}
                        onChange={(e) => setTempApiKey(e.target.value)}
                        className="mb-4"
                      />
                      <div className="flex gap-2">
                        <Button onClick={saveApiKey} className="flex-1">
                          Save API Key
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setTempApiKey('');
                            saveApiKey();
                          }}
                        >
                          Remove Key
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p>• API key is stored locally in your browser</p>
                      <p>• Get your API key from <a href="https://members.ip-api.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ip-api.com</a></p>
                      <p>• Pro API provides higher rate limits and additional features</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-lg text-gray-600">
              Enter any IP address to get detailed geolocation and network information
            </p>
            {apiKey && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 mt-2">
                <Key className="h-3 w-3 mr-1" />
                Pro API Enabled
              </Badge>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Enter IP address (e.g., 8.8.8.8)"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              className="flex-1 h-12 text-lg"
              onKeyPress={(e) => e.key === 'Enter' && lookupIP()}
            />
            <Button
              onClick={() => lookupIP()}
              disabled={loading}
              className="h-12 px-8 bg-brand-600 hover:bg-brand-700 text-white font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Looking up...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Lookup IP
                </>
              )}
            </Button>
          </div>
          
          {autoDetected && ipInfo && (
            <div className="text-center mt-4">
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                Your IP: {ipInfo.query} (Auto-detected)
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {ipInfo && (
        <div className="animate-fade-in">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-brand-600 to-cyan-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Globe className="h-6 w-6" />
                IP Information for {ipInfo.query}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard
                  icon={MapPin}
                  title="Location"
                  value={`${ipInfo.city}, ${ipInfo.regionName}, ${ipInfo.country}`}
                  color="text-red-500"
                />
                
                <InfoCard
                  icon={Globe}
                  title="Country Code"
                  value={ipInfo.countryCode}
                  color="text-blue-500"
                />
                
                <InfoCard
                  icon={MapPin}
                  title="Coordinates"
                  value={`${ipInfo.lat}, ${ipInfo.lon}`}
                  color="text-green-500"
                />
                
                <InfoCard
                  icon={Clock}
                  title="Timezone"
                  value={ipInfo.timezone}
                  color="text-purple-500"
                />
                
                <InfoCard
                  icon={Wifi}
                  title="ISP"
                  value={ipInfo.isp}
                  color="text-orange-500"
                />
                
                <InfoCard
                  icon={Building}
                  title="Organization"
                  value={ipInfo.org}
                  color="text-indigo-500"
                />
                
                <InfoCard
                  icon={Shield}
                  title="ASN"
                  value={ipInfo.as}
                  color="text-cyan-500"
                />
                
                <InfoCard
                  icon={MapPin}
                  title="Postal Code"
                  value={ipInfo.zip || 'N/A'}
                  color="text-pink-500"
                />
                
                <InfoCard
                  icon={Globe}
                  title="Region"
                  value={ipInfo.region}
                  color="text-teal-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Ad Placeholder */}
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="p-8 text-center">
          <div className="text-gray-400">
            <div className="h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📢</div>
                <p className="text-lg font-medium">Advertisement Space</p>
                <p className="text-sm">Dynamic ads will appear here</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IPLookup;
