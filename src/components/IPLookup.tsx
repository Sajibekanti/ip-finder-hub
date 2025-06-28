
import { useState, useEffect } from 'react';
import { Search, MapPin, Globe, Clock, Wifi, Building, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  // Auto-detect user's IP on component mount
  useEffect(() => {
    const detectUserIP = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://ip-api.com/json/');
        const data = await response.json();
        
        if (data.status === 'success') {
          setIpInfo(data);
          setIpAddress(data.query);
          setAutoDetected(true);
        }
      } catch (error) {
        console.error('Error detecting IP:', error);
      } finally {
        setLoading(false);
      }
    };

    detectUserIP();
  }, []);

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
      const response = await fetch(`http://ip-api.com/json/${searchIP}`);
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
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              IP Address Lookup Tool
            </h2>
            <p className="text-lg text-gray-600">
              Enter any IP address to get detailed geolocation and network information
            </p>
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
