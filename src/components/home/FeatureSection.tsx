
import { MapPin, ClipboardCheck, Clock, Bell } from 'lucide-react';

const features = [
  {
    name: 'Easy Reporting',
    description: 'Report issues quickly with our simple form. Include location, photos, and description.',
    icon: MapPin,
  },
  {
    name: 'Issue Tracking',
    description: 'Follow the status of reported issues from submission to resolution.',
    icon: ClipboardCheck,
  },
  {
    name: 'Real-time Updates',
    description: 'Get notifications when your reported issues are being addressed.',
    icon: Clock,
  },
  {
    name: 'Community Alerts',
    description: 'Stay informed about maintenance and community improvement projects.',
    icon: Bell,
  },
];

const FeatureSection = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform makes it easy to report and track community issues, connecting citizens with local services.
          </p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-y-10 gap-x-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-primary">
                  <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
