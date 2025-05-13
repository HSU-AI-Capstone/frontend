import React, { useState } from 'react';
import { professors, videos } from './data/mockData';
import { Video, VideoFormData, VideoEditData } from './types';
import Navbar from './components/Navbar';
import VideoGrid from './components/VideoGrid';
import CreateVideo from './components/CreateVideo';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [activeTab, setActiveTab] = useState<'watch' | 'create'>('watch');
  const [currentVideos, setCurrentVideos] = useState<Video[]>(videos);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoEditData | undefined>();
  
  const selectedVideo = selectedVideoId 
    ? currentVideos.find(v => v.id === selectedVideoId) 
    : null;
    
  const selectedProfessor = selectedVideo 
    ? professors.find(p => p.id === selectedVideo.professorId) 
    : null;

  const handleCreateVideo = (formData: VideoFormData) => {
    const newVideo: Video = {
      id: `vid${currentVideos.length + 1}`,
      title: formData.title,
      description: formData.description,
      professorId: formData.professorId,
      thumbnailUrl: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250',
      videoUrl: '#',
      duration: Math.floor(Math.random() * (3600 - 600) + 600),
      createdAt: new Date(),
      views: 0
    };
    
    setCurrentVideos(prev => [newVideo, ...prev]);
    alert('Video created successfully! You can now view it in the Watch tab.');
    setActiveTab('watch');
  };

  const handleEditVideo = (videoId: string) => {
    const videoToEdit = currentVideos.find(v => v.id === videoId);
    if (videoToEdit) {
      setEditingVideo({
        id: videoToEdit.id,
        title: videoToEdit.title,
        description: videoToEdit.description,
        professorId: videoToEdit.professorId,
        pdfFile: null
      });
      setActiveTab('create');
    }
  };

  const handleUpdateVideo = (formData: VideoFormData) => {
    if (!editingVideo) return;

    setCurrentVideos(prev => prev.map(video => {
      if (video.id === editingVideo.id) {
        return {
          ...video,
          title: formData.title,
          description: formData.description,
          professorId: formData.professorId,
        };
      }
      return video;
    }));

    alert('Video updated successfully!');
    setEditingVideo(undefined);
    setActiveTab('watch');
  };

  const handleDeleteVideo = (videoId: string) => {
    setCurrentVideos(prev => prev.filter(video => video.id !== videoId));
  };

  const handleVideoPlay = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  const handleCloseVideo = () => {
    setSelectedVideoId(null);
  };

  const handleCancelEdit = () => {
    setEditingVideo(undefined);
    setActiveTab('watch');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto py-6">
        {activeTab === 'watch' ? (
          <VideoGrid 
            videos={currentVideos} 
            professors={professors}
            onVideoPlay={handleVideoPlay}
            onVideoEdit={handleEditVideo}
            onVideoDelete={handleDeleteVideo}
          />
        ) : (
          <CreateVideo 
            professors={professors}
            onSubmit={editingVideo ? handleUpdateVideo : handleCreateVideo}
            editData={editingVideo}
            onCancel={editingVideo ? handleCancelEdit : undefined}
          />
        )}
      </main>
      
      {selectedVideo && selectedProfessor && (
        <VideoPlayer 
          video={selectedVideo}
          professor={selectedProfessor}
          onClose={handleCloseVideo}
        />
      )}
    </div>
  );
}

export default App;