
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Building2, AlignJustify } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="container py-4" aria-label="Global">
        <div className="flex items-center justify-between">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-gray-900">Municipal Corporation of India</span>
            </Link>
          </div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <AlignJustify className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          <div className="hidden lg:flex lg:gap-x-8">
            <Link to="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
              Home
            </Link>
            <Link to="/issues" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
              Issues
            </Link>
            <Link to="/report" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
              Report
            </Link>
          </div>
          
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button asChild>
              <Link to="/report">
                Report Issue
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                to="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/issues"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Issues
              </Link>
              <Link
                to="/report"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Report
              </Link>
              <div className="mt-4">
                <Button className="w-full" asChild>
                  <Link to="/report" onClick={() => setMobileMenuOpen(false)}>
                    Report Issue
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
