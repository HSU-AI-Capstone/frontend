import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Video, Professor } from '../types';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  professors: Professor[];
  onVideoPlay: (videoId: string) => void;
  onVideoEdit: (videoId: string) => void;
  onVideoDelete: (videoId: string) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ 
  videos, 
  professors, 
  onVideoPlay,
  onVideoEdit,
  onVideoDelete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfessorId, setSelectedProfessorId] = useState<string | 'all'>('all');
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(videos);

  useEffect(() => {
    let results = videos;
    
    if (selectedProfessorId !== 'all') {
      results = results.filter(video => video.professorId === selectedProfessorId);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      results = results.filter(video => 
        video.title.toLowerCase().includes(term) || 
        video.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredVideos(results);
  }, [videos, searchTerm, selectedProfessorId]);

  const getProfessorById = (id: string): Professor => {
    return professors.find(prof => prof.id === id) || professors[0];
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Video Lectures</h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search videos..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-72 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedProfessorId('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedProfessorId === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Videos
          </button>
          
          {professors.map(professor => (
            <button
              key={professor.id}
              onClick={() => setSelectedProfessorId(professor.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedProfessorId === professor.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {professor.name}
            </button>
          ))}
        </div>
      </div>
      
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No videos found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <VideoCard
              key={video.id}
              video={video}
              professor={getProfessorById(video.professorId)}
              onPlay={onVideoPlay}
              onEdit={onVideoEdit}
              onDelete={onVideoDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGrid;