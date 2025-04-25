import { assets } from "./assets";
import pythonIntroVideo from './videos/python-intro.mp4';
import pythonFunctions from './videos/python-functions.mp4';

const courseVideos = {
  c: [
    {
      id: 'c-intro',
      title: '1. Introduction to C',
      description: 'Learn the basics of C programming',
      duration: '15 min',
      level: 'Beginner',
      thumbnail: assets.c,
      videoUrl: '/videos/c-intro.mp4',
    },
    {
      id: 'c-pointers',
      title: '2. Pointers in C',
      description: 'Master memory management',
      duration: '22 min',
      level: 'Intermediate',
      thumbnail: assets.c,
      videoUrl: '/videos/c-pointers.mp4',
    },
  ],
  Python: [
    {
      id: 'python-intro',
      title: '1. Python Basics',
      description: 'Introduction to Python syntax',
      duration: '17.36 min',
      level: 'Beginner',
      thumbnail: assets.python,
      videoUrl: pythonIntroVideo,
    },
    {
      id: 'python-functions',
      title: '2. Functions in Python',
      description: 'Learn to create reusable code',
      duration: '18 min',
      level: 'Intermediate',
      thumbnail: assets.python,
      videoUrl: pythonFunctions,
    },
  ],
  Java: [
    {
      id: 'java-intro',
      title: '1. Introduction to Java',
      description: 'Learn the basics of Java programming',
      duration: '17.36 min',
      level: 'Beginner',
      thumbnail: assets.java,
      videoUrl: '/videos/java-intro.mp4',
    },
    {
      id: 'java-functions',
      title: '2. Functions in Java',
      description: 'Learn to create reusable code',
      duration: '18 min',
      level: 'Intermediate',
      thumbnail: assets.java,
      videoUrl: '/videos/java-functions.mp4',
    },
  ],
};

export default courseVideos;
