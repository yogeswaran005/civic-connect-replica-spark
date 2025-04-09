
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Image, Upload, Video, CalendarClock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface FormValues {
  title: string;
  description: string;
  location: string;
  category: string;
  contact: string;
}

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

const ReportForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user is logged in
  const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  const userMobile = localStorage.getItem('userMobile');

  // Redirect to login if not logged in
  const checkAuthentication = () => {
    if (!userLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to report an issue",
        variant: "destructive",
      });
      navigate('/login');
      return false;
    }
    return true;
  };

  const onSubmit = (data: FormValues) => {
    if (!checkAuthentication()) return;
    
    setIsSubmitting(true);
    
    // Create issue object with media and status
    const issue = {
      ...data,
      id: `ISSUE-${Math.floor(Math.random() * 10000)}`,
      status: 'reported',
      date: format(new Date(), 'yyyy-MM-dd'),
      reportedBy: userMobile,
      imageUrl: image,
      videoUrl: video,
    };
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Get existing issues from localStorage or initialize empty array
      const existingIssues = JSON.parse(localStorage.getItem('reportedIssues') || '[]');
      
      // Add new issue to array
      existingIssues.push(issue);
      
      // Save updated issues to localStorage
      localStorage.setItem('reportedIssues', JSON.stringify(existingIssues));
      
      console.log('Form submitted:', issue);
      
      toast({
        title: "Issue reported successfully!",
        description: "Thank you for your contribution to our community.",
      });
      
      // Reset form after submission
      reset();
      setImage(null);
      setVideo(null);
      setIsSubmitting(false);
      
      // Redirect to issues page
      navigate('/issues');
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setVideo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Animation classes for elements
  const formItemClass = "transition-all duration-300 hover:border-primary focus-within:border-primary rounded-md p-1";

  return (
    <Card className="border-2 border-gray-100 shadow-xl">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className={formItemClass}>
            <Label htmlFor="title" className="text-base">Issue Title</Label>
            <Input
              id="title"
              placeholder="E.g. Broken Street Light"
              {...register("title", { 
                required: "Title is required",
                minLength: { value: 5, message: "Title must be at least 5 characters" }
              })}
              className={`text-base ${errors.title ? "border-red-500" : ""}`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          
          <div className={formItemClass}>
            <Label htmlFor="category" className="text-base">Category</Label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.category ? "border-red-500" : ""}`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>
          
          <div className={formItemClass}>
            <Label htmlFor="description" className="text-base">Description</Label>
            <Textarea
              id="description"
              placeholder="Please provide details about the issue..."
              rows={4}
              {...register("description", { 
                required: "Description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters" }
              })}
              className={`text-base ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          
          <div className={formItemClass}>
            <Label htmlFor="location" className="text-base">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="location"
                placeholder="E.g. 123 Main Street"
                className={`pl-10 text-base ${errors.location ? "border-red-500" : ""}`}
                {...register("location", { required: "Location is required" })}
              />
            </div>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={formItemClass}>
              <Label htmlFor="image" className="text-base flex items-center gap-2">
                <Image className="h-5 w-5" /> Upload Image
              </Label>
              <div className="mt-1 flex items-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {image ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={image}
                          alt="Preview"
                          className="max-h-24 max-w-full rounded"
                        />
                      </div>
                    ) : (
                      <>
                        <Image className="h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Click to upload an image
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            
            <div className={formItemClass}>
              <Label htmlFor="video" className="text-base flex items-center gap-2">
                <Video className="h-5 w-5" /> Upload Video
              </Label>
              <div className="mt-1 flex items-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {video ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <video
                          src={video}
                          controls
                          className="max-h-24 max-w-full rounded"
                        />
                      </div>
                    ) : (
                      <>
                        <Video className="h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Click to upload a video
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="video"
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleVideoUpload}
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className={formItemClass}>
            <Label htmlFor="date" className="text-base flex items-center gap-2">
              <CalendarClock className="h-5 w-5" /> Report Date
            </Label>
            <Input
              id="date"
              type="date"
              className="text-base"
              defaultValue={format(new Date(), 'yyyy-MM-dd')}
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">
              Current date will be recorded with your report
            </p>
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full text-base py-6 transition-all duration-300 bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Report...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" /> Submit Report
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportForm;
