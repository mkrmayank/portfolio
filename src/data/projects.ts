
import type { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce website with modern UI and robust backend.',
    // Temporarily using a placeholder to help debug image display.
    // If this image shows, the component is working.
    // To use your local image, ensure 'ecommerce.png' is in 'public/images/'
    // and then change this URL back to '/images/ecommerce.png'.
    imageUrl: 'https://picsum.photos/seed/testdebug_ecommerce/600/400',
    imageHint: 'online store placeholder',
    githubUrl: 'https://github.com/your-username/ecommerce-platform',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management tool to boost team productivity.',
    imageUrl: 'https://picsum.photos/seed/taskapp/600/400',
    imageHint: 'productivity app',
    githubUrl: 'https://github.com/your-username/task-management-app',
    tags: ['React', 'Firebase', 'Material UI', 'Node.js'],
  },
  {
    id: '3',
    title: 'Personal Portfolio API',
    description: 'A GraphQL API to serve data for this and other portfolio sites.',
    imageUrl: 'https://picsum.photos/seed/portfolioapi/600/400',
    imageHint: 'code abstract',
    githubUrl: 'https://github.com/your-username/portfolio-api',
    tags: ['GraphQL', 'Apollo Server', 'MongoDB', 'Docker'],
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'A sleek dashboard displaying real-time weather information using a third-party API.',
    imageUrl: 'https://picsum.photos/seed/weatherapp/600/400',
    imageHint: 'weather forecast',
    githubUrl: 'https://github.com/your-username/weather-dashboard',
    tags: ['Vue.js', 'OpenWeatherMap API', 'Tailwind CSS'],
  },
  {
    id: '5',
    title: 'AI Chatbot Interface',
    description: 'A user-friendly interface for interacting with a custom-trained AI model.',
    imageUrl: 'https://picsum.photos/seed/chatbotui/600/400',
    imageHint: 'ai interface',
    githubUrl: 'https://github.com/your-username/ai-chatbot-interface',
    tags: ['Svelte', 'Python', 'FastAPI', 'WebSockets'],
  },
  {
    id: '6',
    title: 'Fitness Tracker Mobile App',
    description: 'A cross-platform mobile app for tracking workouts and fitness progress.',
    imageUrl: 'https://picsum.photos/seed/fitnessapp/600/400',
    imageHint: 'mobile fitness',
    githubUrl: 'https://github.com/your-username/fitness-tracker-app',
    tags: ['React Native', 'Expo', 'SQLite', 'Chart.js'],
  },
];
