
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  MapPin, 
  Search, 
  CheckSquare, 
  Clock, 
  UserCheck, 
  Image as ImageIcon, 
  FileCheck, 
  AlertCircle
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import StatusBadge from '@/components/ui/StatusBadge';
import { useToast } from '@/components/ui/use-toast';

interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: 'reported' | 'in-progress' | 'resolved' | 'rejected';
  date: string;
  reportedBy: string;
  imageUrl?: string;
  videoUrl?: string;
}

const Admin = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if official is logged in
  const officialLoggedIn = localStorage.getItem('officialLoggedIn') === 'true';
  const officialCode = localStorage.getItem('officialCode');
  
  useEffect(() => {
    // Check authentication
    if (!officialLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in as a municipal official to access this page",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    // Load issues from localStorage
    const savedIssues = JSON.parse(localStorage.getItem('reportedIssues') || '[]');
    setIssues(savedIssues);
    setFilteredIssues(savedIssues);
  }, [navigate, toast]);
  
  // Filter issues based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = issues.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredIssues(filtered);
    } else {
      setFilteredIssues(issues);
    }
  }, [searchTerm, issues]);
  
  // Get today's issues
  const todayIssues = filteredIssues.filter(
    issue => issue.date === format(new Date(), 'yyyy-MM-dd')
  );
  
  // Get yesterday's issues
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayIssues = filteredIssues.filter(
    issue => issue.date === format(yesterday, 'yyyy-MM-dd')
  );
  
  // Get older issues
  const olderIssues = filteredIssues.filter(
    issue => 
      issue.date !== format(new Date(), 'yyyy-MM-dd') && 
      issue.date !== format(yesterday, 'yyyy-MM-dd')
  );
  
  const handleStatusChange = (issueId: string, newStatus: 'reported' | 'in-progress' | 'resolved' | 'rejected') => {
    // Update issue in the issues array
    const updatedIssues = issues.map(issue => {
      if (issue.id === issueId) {
        // If status becomes resolved, show a toast thanking the worker
        if (newStatus === 'resolved' && issue.status !== 'resolved') {
          setTimeout(() => {
            toast({
              title: "THANKS FOR GREAT WORK!",
              description: `Issue ${issue.id} has been marked as resolved.`,
            });
          }, 500);
        }
        
        return { ...issue, status: newStatus };
      }
      return issue;
    });
    
    // Update state and localStorage
    setIssues(updatedIssues);
    setFilteredIssues(updatedIssues);
    localStorage.setItem('reportedIssues', JSON.stringify(updatedIssues));
    
    // Update selected issue if viewing in dialog
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue({ ...selectedIssue, status: newStatus });
    }
  };
  
  const openIssueDetails = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsDialogOpen(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('officialLoggedIn');
    localStorage.removeItem('officialCode');
    navigate('/login');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Municipal Office Dashboard
              </h1>
              <p className="mt-2 text-gray-600">
                Logged in as: <span className="font-semibold">{officialCode}</span>
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
          
          <div className="relative flex w-full mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              placeholder="Search issues by title, location or category..."
              className="pl-10 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="today" className="text-base">
                Today's Issues <span className="ml-2 bg-primary/20 rounded-full px-2 py-0.5 text-xs">{todayIssues.length}</span>
              </TabsTrigger>
              <TabsTrigger value="yesterday" className="text-base">
                Yesterday <span className="ml-2 bg-primary/20 rounded-full px-2 py-0.5 text-xs">{yesterdayIssues.length}</span>
              </TabsTrigger>
              <TabsTrigger value="older" className="text-base">
                Older Issues <span className="ml-2 bg-primary/20 rounded-full px-2 py-0.5 text-xs">{olderIssues.length}</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="today">
              {renderIssueList(todayIssues, openIssueDetails, handleStatusChange)}
            </TabsContent>
            
            <TabsContent value="yesterday">
              {renderIssueList(yesterdayIssues, openIssueDetails, handleStatusChange)}
            </TabsContent>
            
            <TabsContent value="older">
              {renderIssueList(olderIssues, openIssueDetails, handleStatusChange)}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Issue Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            {selectedIssue && (
              <>
                <DialogHeader>
                  <DialogTitle>Issue Details: {selectedIssue.id}</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{selectedIssue.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {selectedIssue.category}
                      </div>
                      <StatusBadge status={selectedIssue.status} />
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Description</p>
                          <p className="text-gray-700">{selectedIssue.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Location</p>
                          <p className="text-gray-700">{selectedIssue.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Date Reported</p>
                          <p className="text-gray-700">{selectedIssue.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <UserCheck className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Reported By</p>
                          <p className="text-gray-700">{selectedIssue.reportedBy}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="font-medium mb-2">Update Status:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant={selectedIssue.status === 'reported' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => handleStatusChange(selectedIssue.id, 'reported')}
                        >
                          Reported
                        </Button>
                        <Button 
                          variant={selectedIssue.status === 'in-progress' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => handleStatusChange(selectedIssue.id, 'in-progress')}
                        >
                          In Progress
                        </Button>
                        <Button 
                          variant={selectedIssue.status === 'resolved' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => handleStatusChange(selectedIssue.id, 'resolved')}
                        >
                          Resolved
                        </Button>
                        <Button 
                          variant={selectedIssue.status === 'rejected' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => handleStatusChange(selectedIssue.id, 'rejected')}
                        >
                          Rejected
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedIssue.imageUrl && (
                      <div>
                        <p className="font-medium text-sm mb-2 flex items-center">
                          <ImageIcon className="h-4 w-4 mr-2" /> Image
                        </p>
                        <img 
                          src={selectedIssue.imageUrl} 
                          alt={selectedIssue.title}
                          className="w-full rounded-md border border-gray-200"
                        />
                      </div>
                    )}
                    
                    {selectedIssue.videoUrl && (
                      <div>
                        <p className="font-medium text-sm mb-2">Video</p>
                        <video 
                          src={selectedIssue.videoUrl} 
                          controls
                          className="w-full rounded-md border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

// Helper function to render issue lists
const renderIssueList = (
  issues: Issue[], 
  openIssueDetails: (issue: Issue) => void,
  handleStatusChange: (id: string, status: 'reported' | 'in-progress' | 'resolved' | 'rejected') => void
) => {
  if (issues.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No issues found for this time period.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {issues.map(issue => (
        <Card key={issue.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {issue.imageUrl && (
                <div className="w-full md:w-1/4">
                  <div className="h-full">
                    <img 
                      src={issue.imageUrl} 
                      alt={issue.title}
                      className="h-full w-full object-cover"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                </div>
              )}
              
              <div className={`p-4 flex-1 ${!issue.imageUrl ? 'md:w-3/4' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="mr-4">
                    <h3 className="font-medium text-lg line-clamp-1">{issue.title}</h3>
                    <div className="flex items-center space-x-2 mt-1 mb-2">
                      <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
                        {issue.category}
                      </div>
                      <StatusBadge status={issue.status} />
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{issue.date}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {issue.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="line-clamp-1">{issue.location}</span>
                </div>
                
                <div className="flex flex-wrap items-center justify-between mt-2">
                  <div className="space-x-1">
                    <Button 
                      variant={issue.status === 'reported' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleStatusChange(issue.id, 'reported')}
                    >
                      Reported
                    </Button>
                    <Button 
                      variant={issue.status === 'in-progress' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleStatusChange(issue.id, 'in-progress')}
                    >
                      In Progress
                    </Button>
                    <Button 
                      variant={issue.status === 'resolved' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleStatusChange(issue.id, 'resolved')}
                    >
                      Resolved
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="sm" onClick={() => openIssueDetails(issue)}>
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Admin;
