import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  ...(isProd && { output: 'export' }),
  basePath: '',
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react'],
  },
};

export default nextConfig;
