
import Hero from '@/components/home/Hero';
import FeatureSection from '@/components/home/FeatureSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import IssueList from '@/components/issues/IssueList';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeatureSection />
        <div className="bg-gray-50 py-16">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Recent Issues
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Browse recently reported issues in our community.
              </p>
            </div>
            <IssueList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
