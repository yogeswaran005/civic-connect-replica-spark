
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import IssueList from '@/components/issues/IssueList';

const Issues = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Community Issues
            </h1>
            <p className="mt-4 text-gray-600">
              Browse all reported issues in our community. You can search or filter to find specific issues.
            </p>
          </div>
          <IssueList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Issues;
