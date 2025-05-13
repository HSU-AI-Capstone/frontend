import { Professor, Video } from '../types';

export const professors: Professor[] = [
  {
    id: 'prof1',
    name: 'Dr. Emily Chen',
    avatar: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150',
    specialty: 'Computer Science',
    bio: 'Dr. Chen specializes in artificial intelligence and machine learning. She has published numerous papers on deep learning algorithms.'
  },
  {
    id: 'prof2',
    name: 'Prof. Michael Rodriguez',
    avatar: 'https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150',
    specialty: 'Data Science',
    bio: 'Professor Rodriguez is an expert in data visualization and statistical analysis, with a focus on making complex data accessible.'
  },
  {
    id: 'prof3',
    name: 'Dr. Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/5878503/pexels-photo-5878503.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150',
    specialty: 'Physics',
    bio: 'Dr. Johnson researches quantum computing and theoretical physics. Her lectures are known for making difficult concepts understandable.'
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