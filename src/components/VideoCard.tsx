import React from 'react';
import { Play, Edit, Trash2 } from 'lucide-react';
import { Video, Professor } from '../types';
import { formatDuration, formatViews, formatDate } from '../utils/formatters';

interface VideoCardProps {
  video: Video;
  professor: Professor;
  onPlay: (videoId: string) => void;
  onEdit: (videoId: string) => void;
  onDelete: (videoId: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, professor, onPlay, onEdit, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this video?')) {
      onDelete(video.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(video.id);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={() => onPlay(video.id)}
    >
      <div className="relative">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
            <Play className="h-6 w-6 text-blue-700" />
          </div>
        </div>
        
        {/* Edit and Delete buttons */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleEdit}
            className="p-2 bg-white rounded-full hover:bg-blue-100 transition-colors"
          >
            <Edit className="h-4 w-4 text-blue-600" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <img 
            src={professor.avatar} 
            alt={professor.name} 
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-semibold text-md mb-1 line-clamp-2">{video.title}</h3>
            <p className="text-gray-600 text-sm">{professor.name}</p>
            <div className="flex items-center text-gray-500 text-xs mt-1">
              <span>{formatViews(video.views)}</span>
              <span className="mx-1">•</span>
              <span>{formatDate(video.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;