import React from 'react';
import { Professor } from '../types';

interface ProfessorCardProps {
  professor: Professor;
  isSelected: boolean;
  onSelect: (professorId: string) => void;
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({ 
  professor, 
  isSelected, 
  onSelect 
}) => {
  return (
    <div 
      className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => onSelect(professor.id)}
    >
      <div className="flex items-center space-x-4">
        <img 
          src={professor.avatar} 
          alt={professor.name} 
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{professor.name}</h3>
          <p className="text-sm text-gray-600">{professor.specialty}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-700 line-clamp-2">{professor.bio}</p>
      
      <div className={`mt-3 w-full h-1 ${isSelected ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
    </div>
  );
};

export default ProfessorCard;