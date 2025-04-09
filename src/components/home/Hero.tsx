
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              <span className="block text-primary">Clean City</span>
              <span className="block">Citizen Connect</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Report and track community issues in your neighborhood. 
              Together we can create a cleaner, safer environment for everyone.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/report">
                  Report an Issue <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/issues">View Issues</Link>
              </Button>
            </div>
          </div>
          <div className="lg:relative lg:row-start-1">
            <div className="mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[3/2] w-full rounded-xl bg-gray-50 object-cover lg:aspect-[4/3] lg:h-full shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" 
                  alt="Clean city street" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
