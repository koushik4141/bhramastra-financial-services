import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BHRAMASTRA Financial Services',
    short_name: 'BHRAMASTRA',
    description: 'Institutional-grade market research and advanced data-driven investment strategies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#FF9933',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
