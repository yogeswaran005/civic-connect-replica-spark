
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import IssueList from '@/components/issues/IssueList';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

const Issues = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is logged in
  const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  
  useEffect(() => {
    if (!userLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to view community issues",
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
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Community Issues
              </h1>
              <p className="mt-2 text-gray-600">
                Browse all reported issues in our community. You can search or filter to find specific issues.
              </p>
            </div>
            
            <Button 
              onClick={() => navigate('/report')}
              className="mt-4 sm:mt-0"
            >
              <PenSquare className="mr-2 h-4 w-4" />
              Report New Issue
            </Button>
          </div>
          <IssueList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Issues;
