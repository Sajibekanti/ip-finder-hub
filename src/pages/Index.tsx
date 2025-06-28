
import Header from '@/components/Header';
import IPLookup from '@/components/IPLookup';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-50 via-white to-cyan-50 py-16">
          <div className="container mx-auto px-4">
            <IPLookup />
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
