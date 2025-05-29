import React, { useState, useEffect } from 'react';
import { professors, videos } from './data/mockData';
import { Video, VideoFormData, VideoEditData } from './types';
import Navbar from './components/Navbar';
import VideoGrid from './components/VideoGrid';
import CreateVideo from './components/CreateVideo';
import VideoPlayer from './components/VideoPlayer';
import { lectureApi } from './services/api';

const THUMBNAIL_URLS = [
  'https://blog.kakaocdn.net/dn/bqPYzR/btraWSj02cT/HnIasx6vc09IszobY6Fwe0/img.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToQ1r3rw63vqZnBZ-tJQxunJ9AfWnn4ZLZMg&s',
  'https://htmlcolorcodes.com/assets/images/colors/pastel-purple-color-solid-background-1920x1080.png'
];

function App() {
  const [activeTab, setActiveTab] = useState<'watch' | 'create'>('watch');
  const [currentVideos, setCurrentVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoEditData | undefined>();

  const selectedVideo = selectedVideoId
    ? currentVideos.find(v => v.id === selectedVideoId)
    : null;

  const selectedProfessor = selectedVideo
    ? professors.find(p => p.id === selectedVideo.professorId)
    : null;

  // 컴포넌트가 마운트될 때 비디오 목록을 가져옴
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await lectureApi.getVideos();
        console.log('받은 응답:', response);

        if (response && response.results && Array.isArray(response.results)) {  // results 배열 확인
          const formattedVideos = response.results.map((video) => ({
            id: video.id.toString(),
            title: video.title,
            description: '',
            professorId: video.professor,
            thumbnailUrl: THUMBNAIL_URLS[Math.floor(Math.random() * THUMBNAIL_URLS.length)],
            videoUrl: video.video_url,
            duration: 0,  // 서버에서 제공하지 않는 경우 기본값
            createdAt: new Date(video.created_at),
            views: video.view_count
          }));
          console.log('변환된 비디오:', formattedVideos);
          setCurrentVideos(formattedVideos);
        } else {
          console.error('예상치 못한 응답 형식:', response);
          setCurrentVideos([]);
        }
      } catch (error) {
        console.error('비디오 목록을 가져오는데 실패했습니다:', error);
        setCurrentVideos([]);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos && videos.length) {
      const withRandomThumb = videos.map(v => ({
        ...v,
        thumbnailUrl: THUMBNAIL_URLS[Math.floor(Math.random() * THUMBNAIL_URLS.length)]
      }));
      setCurrentVideos(withRandomThumb);
    }
  }, [activeTab]);

  const handleCreateVideo = async (formData: VideoFormData) => {
    try {
      const response = await lectureApi.uploadLecture(formData);
      if (response && response.data) {
        // 비디오 목록 새로고침
        const videosResponse = await lectureApi.getVideos();
        if (videosResponse && videosResponse.data) {
          const formattedVideos = videosResponse.data.results.map((video: any) => ({
            id: video.id.toString(),
            title: video.title,
            description: '',
            professorId: video.professor,
            thumbnailUrl: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250',
            videoUrl: video.video_url,
            duration: 0,
            createdAt: new Date(video.created_at),
            views: video.view_count
          }));
          setCurrentVideos(formattedVideos);
        }
        alert('Video created successfully!');
        setActiveTab('watch');
      }
    } catch (error) {
      console.error('비디오 생성에 실패했습니다:', error);
    }
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
