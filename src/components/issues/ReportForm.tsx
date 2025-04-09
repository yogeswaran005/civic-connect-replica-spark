
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Image, Upload } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Form submitted:', { ...data, image });
      
      toast({
        title: "Issue reported successfully!",
        description: "Thank you for your contribution to our community.",
      });
      
      // Reset form after submission
      reset();
      setImage(null);
      setIsSubmitting(false);
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

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Issue Title</Label>
            <Input
              id="title"
              placeholder="E.g. Broken Street Light"
              {...register("title", { 
                required: "Title is required",
                minLength: { value: 5, message: "Title must be at least 5 characters" }
              })}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.category ? "border-red-500" : ""}`}
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
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Please provide details about the issue..."
              rows={4}
              {...register("description", { 
                required: "Description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters" }
              })}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id="location"
                placeholder="E.g. 123 Main Street"
                className={`pl-10 ${errors.location ? "border-red-500" : ""}`}
                {...register("location", { required: "Location is required" })}
              />
            </div>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="contact">Contact Information (optional)</Label>
            <Input
              id="contact"
              placeholder="Email or phone number"
              {...register("contact")}
            />
            <p className="text-xs text-gray-500 mt-1">
              Your contact information will only be used for follow-up about this report.
            </p>
          </div>
          
          <div>
            <Label htmlFor="image">Upload Image (optional)</Label>
            <div className="mt-1 flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {image ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={image}
                        alt="Preview"
                        className="max-h-24 max-w-full"
                      />
                    </div>
                  ) : (
                    <>
                      <Image className="h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Click to upload an image
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
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
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Submit Report
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportForm;
