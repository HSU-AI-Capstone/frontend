import { Professor, Video } from '../types';

export const professors: Professor[] = [
  {
    id: 'prof1',
    name: 'DAWOON',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3584/3584411.png',
    specialty: '',
    bio: 'AIcademy 팀원인 김다운 학생의 음성으로 생성'
  },
  {
    id: 'prof2',
    name: 'JI JUN',
    avatar: 'https://i.ytimg.com/vi/3Phhbkk7lk8/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGE8gXShlMA8=&rs=AOn4CLDI9AU_AV6xn5RxU1EoNoDtRSjzIw',
    specialty: '',
    bio: 'AIcademy 팀의 지도교수 지준 교수님의 음성으로 생성'
  },
  {
    id: 'prof3',
    name: 'IU',
    avatar: 'https://cdn.spotvnews.co.kr/news/photo/202409/704412_1101896_1119.jpg',
    specialty: '',
    bio: '대한민국 No.1 싱어송라이터 아이유의 음성으로 생성'
  }
];

export const videos: Video[] = [
  {
    id: 'vid1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of machine learning algorithms and their applications in real-world scenarios.',
    professorId: 'prof1',
    thumbnailUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250',
    videoUrl: 'https://example.com/videos/intro-to-ml.mp4',
    duration: 1845, // 30:45
    createdAt: new Date('2023-11-15'),
    views: 1238
  },
  {
    id: 'vid2',
    title: 'Data Visualization Techniques',
    description: 'Explore effective methods for visualizing complex datasets to extract meaningful insights.',
    professorId: 'prof2',
    thumbnailUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250',
    videoUrl: 'https://example.com/videos/data-viz.mp4',
    duration: 2634, // 43:54
    createdAt: new Date('2023-10-22'),
    views: 873
  },
  {
    id: 'vid3',
    title: 'Quantum Computing Basics',
    description: 'A beginner-friendly introduction to quantum computing principles and their potential applications.',
    professorId: 'prof3',
    thumbnailUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250',
    videoUrl: 'https://example.com/videos/quantum-basics.mp4',
    duration: 3127, // 52:07
    createdAt: new Date('2023-12-05'),
    views: 1567
  },
  {
    id: 'vid4',
    title: 'Neural Networks Deep Dive',
    description: 'Advanced concepts in neural network architectures and training methodologies.',
    professorId: 'prof1',
    thumbnailUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250',
    videoUrl: 'https://example.com/videos/neural-networks.mp4',
    duration: 2910, // 48:30
    createdAt: new Date('2024-01-18'),
    views: 942
  },
  {
    id: 'vid5',
    title: 'Statistical Analysis Methods',
    description: 'Comprehensive overview of statistical methods used in data science research.',
    professorId: 'prof2',
    thumbnailUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250',
    videoUrl: 'https://example.com/videos/stats-methods.mp4',
    duration: 2345, // 39:05
    createdAt: new Date('2024-02-03'),
    views: 756
  },
  {
    id: 'vid6',
    title: 'Exploring String Theory',
    description: 'An accessible introduction to string theory and its implications for our understanding of the universe.',
    professorId: 'prof3',
    thumbnailUrl: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250',
    videoUrl: 'https://example.com/videos/string-theory.mp4',
    duration: 3362, // 56:02
    createdAt: new Date('2024-02-28'),
    views: 1089
  }
];
