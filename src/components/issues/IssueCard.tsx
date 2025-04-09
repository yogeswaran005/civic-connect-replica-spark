
import { Clock, MapPin } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

export interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: 'reported' | 'in-progress' | 'resolved' | 'rejected';
  date: string;
  imageUrl?: string;
}

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
      {issue.imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {issue.category}
          </div>
          <StatusBadge status={issue.status} />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900">{issue.title}</h3>
        
        <p className="mt-2 text-gray-600 line-clamp-2">{issue.description}</p>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{issue.location}</span>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{issue.date}</span>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
