
import { useState } from 'react';
import IssueCard, { Issue } from './IssueCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

// Sample data for demo purposes
const sampleIssues: Issue[] = [
  {
    id: '1',
    title: 'Broken Street Light',
    description: 'Street light is not working at the corner of Maple and Oak Street. The area is very dark at night and creates a safety hazard.',
    location: 'Maple and Oak Street',
    category: 'Street Lighting',
    status: 'reported',
    date: '2023-04-01',
    imageUrl: 'https://images.unsplash.com/photo-1518281361980-b26bfd556770?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: '2',
    title: 'Pothole on Main Street',
    description: 'Large pothole forming on Main Street near the library. It\'s becoming a hazard for vehicles.',
    location: '123 Main Street',
    category: 'Road Maintenance',
    status: 'in-progress',
    date: '2023-04-02',
    imageUrl: 'https://images.unsplash.com/photo-1582571352032-448f7928eca3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80',
  },
  {
    id: '3',
    title: 'Overflowing Trash Bin',
    description: 'The public trash bin at Central Park is overflowing and needs emptying. Attracting pests.',
    location: 'Central Park, South Entrance',
    category: 'Waste Management',
    status: 'resolved',
    date: '2023-04-03',
    imageUrl: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1925&q=80',
  },
  {
    id: '4',
    title: 'Graffiti on Community Center',
    description: 'Someone has sprayed graffiti on the north wall of the community center. It needs cleaning.',
    location: 'Downtown Community Center',
    category: 'Vandalism',
    status: 'reported',
    date: '2023-04-04',
  },
  {
    id: '5',
    title: 'Fallen Tree Branch',
    description: 'A large tree branch has fallen and is blocking the sidewalk. Pedestrians have to walk on the road to get around it.',
    location: 'Elm Street Sidewalk',
    category: 'Tree Maintenance',
    status: 'in-progress',
    date: '2023-04-05',
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
  },
  {
    id: '6',
    title: 'Broken Playground Equipment',
    description: 'The swing set at the children\'s playground has a broken chain. It\'s unsafe for children to use.',
    location: 'Riverside Park Playground',
    category: 'Parks & Recreation',
    status: 'reported',
    date: '2023-04-06',
  },
];

const IssueList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredIssues = sampleIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
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
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
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
        </div>
      )}
    </div>
  );
};

export default IssueList;
