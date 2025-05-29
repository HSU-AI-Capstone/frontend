import React, { useRef, useState } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number>(video.duration);

  const handleVideoLoad = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative pt-[56.25%]"> {/* 16:9 비율 */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          onLoadedMetadata={handleVideoLoad}
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onPlay(video.id)}
            className="text-white opacity-0 hover:opacity-100 transition-opacity"
          >
            <Play className="h-12 w-12" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{professor.name}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{formatDuration(Math.floor(duration))}</span>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
