
import { useState, useEffect } from 'react';
import IssueCard, { Issue } from './IssueCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const IssueList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeStatusFilter, setActiveStatusFilter] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is logged in
  const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  
  // Status options
  const statusOptions = [
    { value: 'reported', label: 'Reported' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' },
  ];
  
  // Categories for filtering
  const categories = [
    'Street Lighting',
    'Road Maintenance',
    'Parks & Recreation',
    'Waste Management',
    'Graffiti & Vandalism',
    'Traffic Signals',
    'Sidewalk Issues',
    'Tree Maintenance',
    'Other',
  ];
  
  useEffect(() => {
    // Check authentication
    if (!userLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to view community issues",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    // Load issues from localStorage
    const savedIssues = JSON.parse(localStorage.getItem('reportedIssues') || '[]');
    setIssues(savedIssues);
    setFilteredIssues(savedIssues);
  }, [navigate, toast, userLoggedIn]);
  
  useEffect(() => {
    let filtered = [...issues];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(issue => activeFilters.includes(issue.category));
    }
    
    // Apply status filter
    if (activeStatusFilter) {
      filtered = filtered.filter(issue => issue.status === activeStatusFilter);
    }
    
    setFilteredIssues(filtered);
  }, [searchTerm, issues, activeFilters, activeStatusFilter]);
  
  const toggleFilter = (category: string) => {
    setActiveFilters(prev => 
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };
  
  const toggleStatusFilter = (status: string) => {
    setActiveStatusFilter(prev => 
      prev === status ? null : status as 'reported' | 'in-progress' | 'resolved' | 'rejected'
    );
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
    setActiveStatusFilter(null);
  };
  
  // Animation classes for filter transition
  const filterBadgeClass = "transition-all duration-200 transform hover:scale-105";
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search issues..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => document.getElementById('filter-section')?.classList.toggle('hidden')}
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <div id="filter-section" className="mb-6 hidden">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="mb-4">
            <h3 className="font-medium mb-2">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={activeFilters.includes(category) ? "default" : "outline"}
                  className={`cursor-pointer ${filterBadgeClass}`}
                  onClick={() => toggleFilter(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Filter by Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <Badge 
                  key={status.value} 
                  variant={activeStatusFilter === status.value ? "default" : "outline"}
                  className={`cursor-pointer ${filterBadgeClass}`}
                  onClick={() => toggleStatusFilter(status.value)}
                >
                  {status.label}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
      
      {filteredIssues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No issues found matching your search.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/report')}
          >
            Report an Issue
          </Button>
        </div>
      )}
    </div>
  );
};

export default IssueList;
