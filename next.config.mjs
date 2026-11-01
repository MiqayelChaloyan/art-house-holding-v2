import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    transpilePackages: [
      'sanity',
      'next-sanity',
      '@sanity/vision',
      '@sanity/dashboard',
      '@sanity/client',
      '@sanity/eventsource',
    ],

    experimental: {
      serverComponentsExternalPackages: ['@sanity/image-url'],
    },

    webpack: (config, { dev, isServer }) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Avoid lazy chunk load failures for Sanity document lists in embedded Studio
        '@sanity/eventsource$': '@sanity/eventsource/browser',
        'slate-react': path.resolve(__dirname, 'node_modules/slate-react'),
        slate: path.resolve(__dirname, 'node_modules/slate'),
      };

      if (dev && isServer) {
        config.optimization.splitChunks = false;
      }

      return config;
    },

    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  
    images: {
      unoptimized: process.env.NODE_ENV === 'development',
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
          port: "",
        },
      ],
    },
    compiler: {
      relay: {
        src: './',
        artifactDirectory: './__generated__',
        language: 'typescript',
        eagerEsModules: false,
        styledComponents: true,
      },
      removeConsole: process.env.NEXT_NODE_ENV === "production"
    },
    async headers() {
      if (process.env.NODE_ENV !== 'production') {
        return [];
      }

      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains',
            },
          ],
        },
      ];
    },
};

export default withNextIntl(nextConfig);