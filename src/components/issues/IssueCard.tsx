
import { Clock, MapPin } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

export interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: 'reported' | 'in-progress' | 'resolved' | 'rejected';
  date: string;
  imageUrl?: string;
  videoUrl?: string;
  reportedBy?: string;
}

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <Card className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300 h-full">
        {issue.imageUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={issue.imageUrl}
              alt={issue.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {issue.category}
            </div>
            <StatusBadge status={issue.status} />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">{issue.title}</h3>
          
          <p className="mt-2 text-gray-600 line-clamp-2">{issue.description}</p>
          
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{issue.location}</span>
          </div>
          
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{issue.date}</span>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4"
            onClick={() => setIsDetailsOpen(true)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{issue.title}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {issue.category}
                </div>
                <StatusBadge status={issue.status} />
              </div>
              
              <p className="text-gray-700 mt-4">{issue.description}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{issue.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Reported on {issue.date}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-medium">Current Status</p>
                <div className="mt-2">
                  <StatusBadge status={issue.status} className="text-sm px-3 py-1" />
                  <p className="mt-2 text-sm text-gray-500">
                    {issue.status === 'reported' && 'Your issue has been reported and is waiting for review.'}
                    {issue.status === 'in-progress' && 'Municipal workers are currently addressing this issue.'}
                    {issue.status === 'resolved' && 'This issue has been successfully resolved.'}
                    {issue.status === 'rejected' && 'This issue has been reviewed but cannot be addressed at this time.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {issue.imageUrl && (
                <div>
                  <p className="text-sm font-medium mb-2">Image</p>
                  <img 
                    src={issue.imageUrl} 
                    alt={issue.title}
                    className="w-full rounded-md border border-gray-200"
                  />
                </div>
              )}
              
              {issue.videoUrl && (
                <div>
                  <p className="text-sm font-medium mb-2">Video</p>
                  <video 
                    src={issue.videoUrl} 
                    controls
                    className="w-full rounded-md border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IssueCard;
