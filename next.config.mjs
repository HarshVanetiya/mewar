/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export: host free on Cloudflare Pages, no server needed.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
