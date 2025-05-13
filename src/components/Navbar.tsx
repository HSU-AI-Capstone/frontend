import React from 'react';
import { Video, MessageSquare } from 'lucide-react';

interface NavbarProps {
  activeTab: 'watch' | 'create';
  onTabChange: (tab: 'watch' | 'create') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Video className="h-6 w-6 text-blue-600" />
          <h1 className="ml-2 text-xl font-semibold text-gray-800">EduVid</h1>
        </div>
        
        <nav className="flex space-x-1">
          <button
            onClick={() => onTabChange('watch')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center ${
              activeTab === 'watch'
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Video className="h-4 w-4 mr-2" />
            <span>Watch</span>
          </button>
          
          <button
            onClick={() => onTabChange('create')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center ${
              activeTab === 'create'
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Create</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;