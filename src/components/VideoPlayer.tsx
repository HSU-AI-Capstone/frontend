import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import { Video, Professor } from '../types';
import { formatDuration } from '../utils/formatters';

interface VideoPlayerProps {
  video: Video;
  professor: Professor;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, professor, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Sample video URLs for demonstration
  const sampleVideos = [
    'https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4',
    'https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm'
  ];

  useEffect(() => {
    let progressInterval: number;

    if (isPlaying) {
      progressInterval = window.setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / video.duration) * 0.1;
          if (newProgress >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return newProgress;
        });

        setCurrentTime(prev => {
          const newTime = prev + 0.1;
          if (newTime >= video.duration) {
            return 0;
          }
          return newTime;
        });
      }, 100);
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isPlaying, video.duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedProgress = (x / rect.width) * 100;
    setProgress(clickedProgress);
    setCurrentTime((clickedProgress / 100) * video.duration);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="relative">
          <video
            className="w-full aspect-video bg-black"
            poster={video.thumbnailUrl}
            muted={isMuted}
            autoPlay={isPlaying}
            src={sampleVideos[0]}
          >
            {sampleVideos.map((url, index) => (
              <source key={index} src={url} />
            ))}
            Your browser does not support the video tag.
          </video>
          
          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={togglePlay} 
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                
                <button 
                  onClick={toggleMute} 
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                
                <span className="text-white text-sm">
                  {formatDuration(Math.floor(currentTime))} / {formatDuration(video.duration)}
                </span>
              </div>
              
              <button 
                onClick={onClose}
                className="text-white hover:text-red-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Progress bar */}
            <div 
              className="h-1 bg-gray-600 rounded-full w-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Video Info */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{video.title}</h2>
          <div className="flex items-center mb-3">
            <img 
              src={professor.avatar} 
              alt={professor.name} 
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-gray-700">{professor.name}</span>
          </div>
          <p className="text-gray-600">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;