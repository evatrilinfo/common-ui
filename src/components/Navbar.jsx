import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const navItems = [
    { name: 'Home', url: 'https://evatril.com' },
    { name: 'Menu', url: 'https://menu.evatril.com' },
    { name: 'Venue', url: 'https://venue.evatril.com' },
    { name: 'Services', url: 'https://services.evatril.com' },
    { name: 'Invitation', url: 'https://invitation.evatril.com' }
  ];

  const handleNavigation = (item) => {
    setActiveItem(item.name);
      window.open(item.url, '_self'); // opens in the same tab
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-white text-xl font-bold cursor-pointer">
              Evatril
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeItem === item.name
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white hover:bg-opacity-10 hover:-translate-y-0.5'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none"
            >
              <div className="space-y-1">
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-purple-700 to-blue-700 rounded-lg mt-2 shadow-lg">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  handleNavigation(item);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium transition-all duration-300 hover:pl-6 border-b border-white border-opacity-10 last:border-b-0 ${
                  activeItem === item.name
                    ? 'bg-white text-purple-600'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;