import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200  bottom-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-gray-500">&copy; {new Date().getFullYear()} SportsProduct Manager. Gui - Sanches</p>
      </div>
    </footer>
  );
};

export default Footer;
