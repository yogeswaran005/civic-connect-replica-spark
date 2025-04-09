
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ReportForm from '@/components/issues/ReportForm';
import { useToast } from '@/components/ui/use-toast';

const Report = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is logged in
  const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  
  useEffect(() => {
    if (!userLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to report an issue",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast, userLoggedIn]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-12 animate-fade-in">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Report an Issue
              </h1>
              <p className="mt-4 text-gray-600">
                Use the form below to report an issue in your community. Be as detailed as possible to help us address it quickly.
              </p>
            </div>
            <ReportForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Report;
